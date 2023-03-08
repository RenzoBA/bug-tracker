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
  addDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  serverTimestamp,
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
            pids.push(doc.id);
          });
          if (pids.length !== 0) {
            setCurrentPid(pids[0]);
          }
          setCurrentUser({ uid, displayName, email, photoURL, pids });
          // console.log("currentUser (useEffect): ", currentUser);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.log("Connection Error: ", error.message);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscriber();
  }, []);

  const signIn = async (email, password, setOpenModal) => {
    try {
      setOpenModal(false);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let pids = [];
      const querySnapshot = await getDocs(
        collection(db, `users/${userCredential.user.uid}/projects`)
      );
      querySnapshot.forEach((doc) => {
        pids.push(doc.id);
      });
      if (pids.length !== 0) {
        setCurrentPid(pids[0]);
        router.push("/dashboard");
      } else {
        router.push("/create_project");
      }
    } catch (error) {
      setOpenModal(true);
      console.log(error.message);
    }
  };

  const sendSignInLink = async (url, email, setOpenModal) => {
    const actionCodeSettings = {
      url: url,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setOpenModal(true);
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

  const updateUserInfo = async (displayName, file) => {
    try {
      if (file !== "") {
        const fileRef = ref(storage, `users/${auth.currentUser.uid}`);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
        await setDoc(doc(db, `users/${currentUser.uid}`), {
          displayName: displayName,
          photoURL: photoURL,
          email: currentUser.email,
        });
      } else {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        await setDoc(doc(db, `users/${currentUser.uid}`), {
          displayName: displayName,
          email: currentUser.email,
        });
      }
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

  const resetUserPassword = async (
    email,
    setOpenModalPasswordReset,
    setOpenModalUserNotFound
  ) => {
    try {
      setOpenModalUserNotFound(false);
      await sendPasswordResetEmail(auth, email);
      setOpenModalPasswordReset(true);
    } catch (error) {
      setOpenModalPasswordReset(false);
      setOpenModalUserNotFound(true);
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
    const userInfo = await getDoc(doc(db, `users/${uid}`));
    return userInfo.data();
  };

  const removeUser = async () => {
    try {
      await deleteUser(auth.currentUser);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const createProject = async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, "projects"), projectData);
      await setDoc(
        doc(db, `users/${currentUser.uid}/projects/${docRef.id}`),
        projectData
      );
      setCurrentPid(docRef.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const joinProject = async (pid) => {
    try {
      const projectData = await getDoc(doc(db, `projects/${pid}`));
      console.log("projectData (join Project): ", projectData.data());
      await setDoc(
        doc(db, `users/${currentUser.uid}/projects/${pid}`),
        projectData.data()
      );
      setCurrentPid(pid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createBugReport = async (bugData) => {
    try {
      const docRef = await addDoc(
        collection(db, `projects/${currentPid}/bugs/`),
        bugData
      );
      setModal({
        open: true,
        title: "Bug added",
        description: "This bug was added.",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeBugReport = async (bid, complete) => {
    try {
      console.log(`projects/${currentPid}/bugs/${bid}`);
      await updateDoc(doc(db, `projects/${currentPid}/bugs/${bid}`), {
        complete: !complete,
        updated: serverTimestamp(),
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

  const deleteBugReport = async (bid) => {
    try {
      await deleteDoc(doc(db, `projects/${currentPid}/bugs`, bid));
      setModal({
        open: true,
        title: "Bug deleted",
        description: "This bug was deleted.",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBugReports = async (setBugReports) => {
    try {
      const qBugs = query(collection(db, `projects/${currentPid}/bugs/`));
      const unsubscribe = onSnapshot(qBugs, (querySnapshot) => {
        const bugs = [];
        querySnapshot.forEach((doc) => {
          bugs.push({ ...doc.data(), bid: doc.id });
        });
        setBugReports(bugs);
      });
      console.log("currentUser: ", currentUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDuration = (start, end) => {
    const seconds = (end - start) / 1000;
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
    modal,
    setModal,
    categorySelected,
    setCategorySelected,
    loading,
    signIn,
    sendSignInLink,
    signInLink,
    updateUserInfo,
    updateUserPassword,
    resetUserPassword,
    logOut,
    getUserInfo,
    removeUser,
    createProject,
    joinProject,
    createBugReport,
    completeBugReport,
    deleteBugReport,
    getBugReports,
    getDuration,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
