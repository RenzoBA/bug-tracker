"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "firebaseConfig";
import { RiBug2Fill } from "react-icons/ri";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Send Password Reset email error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-2xl lowercase text-decoration flex gap-1">
          bug tracker <RiBug2Fill className="text-3xl" />
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className="input peer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Email address</label>
          </div>
          <button className="signin-button mt-4">Recover Password</button>
        </form>
        <p className="text-white/50 text-sm text-center font-extralight italic">
          Please check your email inbox and follow the link.
        </p>
        <div className="w-full flex flex-row justify-between">
          <Link href="/signup" className="link">
            Sign Up
          </Link>
          <Link href="/" className="link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
