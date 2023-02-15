"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "firebaseConfig";
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
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [categorySelected, setCategorySelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      console.log("useeffect user: ", currentUser);
      setLoading(false);
    });

    return user;
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

  const updateUserInfo = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
