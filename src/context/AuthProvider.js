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
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pid, setPid] = useState("project-test");
  const [categorySelected, setCategorySelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.log("Connection Error");
      } finally {
        setLoading(false);
      }
    });
    console.log("useeffect user: ", currentUser);

    return () => unsubscriber();
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const sendSignInLink = async (url, email) => {
    const actionCodeSettings = {
      url: url,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
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
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
      } else {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateUserPassword = async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const resetUserPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const removeUser = async () => {
    try {
      await deleteUser(auth.currentUser);
      router.push("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const createProject = async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, "projects"), projectData);
      console.log(docRef.id);
      setPid(docRef.id);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const createBugReport = async (bugData) => {
    try {
      const docRef = await addDoc(
        collection(db, `projects/${pid}/bugs/`),
        bugData
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const getBugReports = (setBugReports) => {
    try {
      console.log(`projects/${pid}/bugs/`);
      const q = query(collection(db, `projects/${pid}/bugs/`));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bugs = [];
        querySnapshot.forEach((doc) => {
          bugs.push({ ...doc.data(), id: doc.id });
        });
        setBugReports(bugs);
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  // const uploadFile = async (file) => {
  //   try {
  //     console.log("file: ", file);
  //     const fileRef = ref(storage, `users/${auth.currentUser.uid}`);

  //     const snapshot = await uploadBytes(fileRef, file);
  //     const URL = await getDownloadURL(fileRef);
  //     return URL;
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //   }
  // };

  const getDuration = (start, end) => {
    const seconds = (end - start) / 1000;
    return seconds < 60
      ? "0 min"
      : seconds < 3600
      ? `${Math.round(seconds / 60)} min`
      : seconds < 86400
      ? `${Math.round(seconds / 3600)} h`
      : seconds < 604800
      ? `${Math.round(seconds / 86400)} d`
      : new Date(start).toDateString();
  };

  const value = {
    currentUser,
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
    removeUser,
    createProject,
    createBugReport,
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
