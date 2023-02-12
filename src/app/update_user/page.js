"use client";

import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { RiBug2Fill } from "react-icons/ri";
import { ThemeContext } from "../theme-provider";

const UpdateUser = () => {
  const { setUser } = useContext(ThemeContext);
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(
    "local in update_user:",
    window.localStorage.getItem("emailForSignIn")
  );

  useEffect(() => {
    const signInEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("please provide your email for confirmation");
        }
        try {
          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );
          console.log("RESULT", result);
          // setUser(result.user);
          window.localStorage.removeItem("emailForSignIn");
        } catch (error) {
          alert("Sign In with email link error");
        }
      }
    };
    signInEmailLink();
  }, []);

  const updateInfo = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
        //ADD USER IMAGE UPLOAD

        //add more profile info to update (creating useStates)
      });
    } catch (error) {
      alert("Error updatying profile info");
    }
  };

  const updatePass = async () => {
    try {
      if (password === confirmPassword) {
        await updatePassword(auth.currentUser, password);
      } else {
        alert("Passwords do not match. Please try again");
      }
    } catch (error) {
      alert("Error updatying password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo();
    updatePass();
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-2xl lowercase text-decoration flex gap-1">
          bug tracker <RiBug2Fill className="text-3xl" />
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            {/* ADD USER IMAGE UPLOAD */}
          </div>
          <div className="relative">
            <input
              required
              id="display-name"
              type="text"
              placeholder="Display name"
              className="input peer"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <label className="label">Display name</label>
          </div>
          <div className="relative">
            <input
              required
              id="password"
              type="password"
              placeholder="Password"
              className="input peer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Password</label>
          </div>
          <div className="relative">
            <input
              required
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
              className="input peer"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="label">Confirm password</label>
          </div>
          <button className="signin-button mt-4">Save</button>
        </form>
        <div className="w-full flex flex-row justify-between">
          <Link href="/signup" className="link">
            Sign Up
          </Link>
          <Link href="/password_reset" className="link">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
