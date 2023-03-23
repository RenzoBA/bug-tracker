"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPid, setCurrentPid] = useState("");
  const [categorySelected, setCategorySelected] = useState("dashboard");
  const [modal, setModal] = useState({
    open: false,
    title: "",
    description: "",
  });
  const [openPidContainer, setOpenPidContainer] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;

          let pids = [];
          const querySnapshot = await getDocs(
            collection(db, `users/${uid}/projects`)
          );
          querySnapshot.forEach((doc) => {
            pids.push(doc.data().pid);
          });
          if (pids.length !== 0) {
            setCurrentPid(pids[0]);
          }
          setCurrentUser({ uid, displayName, email, photoURL, pids });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscriber();
  }, []);

  const signIn = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setModal({
        open: true,
        title: "Great!",
        description: "You login successfully.",
      });
      let pids = [];
      const querySnapshot = await getDocs(
        collection(db, `users/${user.uid}/projects`)
      );
      querySnapshot.forEach((doc) => {
        pids.push(doc.data().pid);
      });
      if (pids.length !== 0) {
        setCurrentPid(pids[0]);
        router.push("/dashboard");
      } else {
        router.push("/create_project");
      }
    } catch (error) {
      setModal({
        open: true,
        title: "Login Failed",
        description: "Incorrect email or password.",
      });
      console.log(error.message);
    }
  };

  const sendSignInLink = async (email) => {
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/update_user",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setModal({
        open: true,
        title: "Sign up successful",
        description: "Please check your email inbox.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInLink = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      try {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const setUserInfo = async (displayName, photoFile, password) => {
    try {
      if (photoFile === "") {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        await setDoc(doc(db, `users/${currentUser.uid}`), {
          uid: currentUser.uid,
          displayName: displayName,
          photoURL: "",
          email: currentUser.email,
        });
      } else {
        const fileRef = ref(storage, `users/${currentUser.uid}`);
        await uploadBytes(fileRef, photoFile);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
        await setDoc(doc(db, `users/${currentUser.uid}`), {
          uid: currentUser.uid,
          displayName: displayName,
          photoURL: photoURL,
          email: currentUser.email,
        });
      }
      setCurrentUser({ ...currentUser, ...auth.currentUser });
      await updateUserPassword(password);
      setModal({
        open: true,
        title: "User updated",
        description: "Your information was updated.",
      });
    } catch (error) {
      console.log(error.message);
    }
    router.push("/create_project");
  };

  const updateProjectInfo = async (projectInfo) => {
    try {
      await updateDoc(doc(db, `projects/${currentPid}`), {
        name: projectInfo.name,
        description: projectInfo.description,
        requirements: projectInfo.requirements,
      });

      setModal({
        open: true,
        title: "Project updated",
        description: "The project information was updated.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserInfo = async (displayName, photoFile) => {
    try {
      if (photoFile === "") {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        await updateDoc(doc(db, `users/${currentUser.uid}`), {
          displayName: displayName,
        });
      } else {
        const fileRef = ref(storage, `users/${currentUser.uid}`);
        await uploadBytes(fileRef, photoFile);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
        await updateDoc(doc(db, `users/${currentUser.uid}`), {
          displayName: displayName,
          photoURL: photoURL,
        });
      }
      setCurrentUser({ ...currentUser, ...auth.currentUser });
      setModal({
        open: true,
        title: "User updated",
        description: "Your information was updated.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUserPassword = async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      setModal({
        open: true,
        title: "Password updated",
        description: "Your password was updated.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetUserPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setModal({
        open: true,
        title: "Password reset successful",
        description: "Please check your email inbox.",
      });
    } catch (error) {
      setModal({
        open: true,
        title: "User not found",
        description: "Please enter a correct email.",
      });
      console.log(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInfo = async (uid) => {
    try {
      const userInfo = await getDoc(doc(db, `users/${uid}`));
      return userInfo.data();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProjectInfo = async (pid) => {
    try {
      const projectInfo = await getDoc(doc(db, `projects/${pid}`));
      return projectInfo.data();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBugsResume = async (setBugResume) => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, `projects/${currentPid}/bugs/`),
        (querySnapshot) => {
          const bugs = [];
          querySnapshot.forEach((doc) => {
            const { complete } = doc.data();
            bugs.push({ complete, bid: doc.id });
          });
          setBugResume(bugs);
        }
      );
      return () => unsubscribe();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTeamMembers = async () => {
    const teamInfo = await getDoc(doc(db, `projects/${currentPid}`));
    return teamInfo.data().team;
  };

  const removeUser = async () => {
    try {
      await deleteUser(auth.currentUser);
      setCurrentUser(null);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeProject = async () => {
    try {
      const { team } = await getProjectInfo(currentPid);
      for (let i = 0; i < team.length; i++) {
        await deleteDoc(doc(db, `users/${team[i]}/projects/${currentPid}`));
      }
      await deleteDoc(doc(db, `projects/${currentPid}`));

      const currentPids = currentUser.pids.filter((pid) => pid !== currentPid);
      setCurrentUser({
        ...currentUser,
        pids: currentPids,
      });
      if (currentPids.length > 0) {
        setCurrentPid(currentPids[0]);
        setCategorySelected("dashboard");
        router.push("/dashboard");
      } else {
        setCurrentPid("");
        setCategorySelected("dashboard");
        router.push("/create_project");
      }
      setModal({
        open: true,
        title: "Project deleted",
        description: "This project was deleted.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createProject = async (projectData) => {
    try {
      const docRef = doc(collection(db, "projects"));
      const date = serverTimestamp();

      await setDoc(docRef, {
        ...projectData,
        owner: currentUser.uid,
        date,
        pid: docRef.id,
        team: [currentUser.uid],
      });

      await setDoc(doc(db, `users/${currentUser.uid}/projects/${docRef.id}`), {
        // ...projectData,
        date,
        pid: docRef.id,
      });
      setCurrentUser({
        ...currentUser,
        pids: [...currentUser.pids, docRef.id],
      });
      setCurrentPid(docRef.id);
      setModal({
        open: true,
        title: "Project created",
        description: "Your project was created.",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  const joinProject = async (projectID) => {
    try {
      await updateDoc(doc(db, `projects/${projectID}`), {
        team: arrayUnion(currentUser.uid),
      });

      const project = await getDoc(doc(db, `projects/${projectID}`));
      const { date, description, name, owner, requirements, pid } =
        project.data();

      await setDoc(doc(db, `users/${currentUser.uid}/projects/${projectID}`), {
        date,
        // description,
        // name,
        // owner,
        // requirements,
        pid,
      });
      setCurrentUser({
        ...currentUser,
        pids: [...currentUser.pids, pid],
      });
      setCurrentPid(projectID);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  const createBugReport = async (bugData) => {
    try {
      const docRef = doc(collection(db, `projects/${currentPid}/bugs`));
      const date = serverTimestamp();
      await setDoc(docRef, {
        ...bugData,
        owner: currentUser.uid,
        date,
        bid: docRef.id,
        complete: false,
      });
      setModal({
        open: true,
        title: "Bug added",
        description: "This bug was added.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeBugReport = async (bid, complete) => {
    try {
      await updateDoc(doc(db, `projects/${currentPid}/bugs/${bid}`), {
        complete: !complete,
      });
      setModal({
        open: !complete,
        title: "Bug completed",
        description: "This bug was completed.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateBugReport = async (bid) => {};

  const createBugComment = async (bid, comment) => {
    try {
      const docRef = doc(
        collection(db, `projects/${currentPid}/bugs/${bid}/comments`)
      );
      const date = serverTimestamp();
      await setDoc(docRef, {
        date,
        comment,
        user: currentUser.uid,
        bcid: docRef.id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBugReport = async (bug) => {
    try {
      if (bug.owner === currentUser.uid) {
        //pending: delete bug comments collection
        await deleteDoc(doc(db, `projects/${currentPid}/bugs`, bug.bid));
        setModal({
          open: true,
          title: "Bug deleted",
          description: "This bug was deleted.",
        });
      } else {
        setModal({
          open: true,
          title: "Cannot be deleted",
          description: "Only the bug owner can delete it.",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBugComments = (bid, setBugComments) => {
    try {
      const q = query(
        collection(db, `projects/${currentPid}/bugs/${bid}/comments`),
        orderBy("date", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
          comments.push(doc.data());
        });
        setBugComments(comments);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBugReports = (setBugReports) => {
    try {
      const q = query(
        collection(db, `projects/${currentPid}/bugs/`),
        orderBy("date", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bugs = [];
        querySnapshot.forEach((doc) => {
          bugs.push(doc.data());
        });
        setBugReports(bugs);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDuration = (start) => {
    const seconds = Date.now() / 1000 - start;
    return seconds < 60
      ? "0m ago"
      : seconds < 3600
      ? `${Math.round(seconds / 60)}m ago`
      : seconds < 86400
      ? `${Math.round(seconds / 3600)}h ago`
      : seconds < 604800
      ? `${Math.round(seconds / 86400)}d ago`
      : new Date(start).toDateString();
  };

  const value = {
    currentUser,
    currentPid,
    setCurrentPid,
    modal,
    setModal,
    openPidContainer,
    setOpenPidContainer,
    categorySelected,
    setCategorySelected,
    loading,
    signIn,
    sendSignInLink,
    signInLink,
    setUserInfo,
    updateProjectInfo,
    updateUserInfo,
    updateUserPassword,
    resetUserPassword,
    logOut,
    getUserInfo,
    getProjectInfo,
    getBugsResume,
    getTeamMembers,
    removeUser,
    removeProject,
    createProject,
    joinProject,
    createBugReport,
    completeBugReport,
    updateBugReport,
    deleteBugReport,
    getBugReports,
    createBugComment,
    getBugComments,
    getDuration,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
