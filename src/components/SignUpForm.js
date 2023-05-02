"use client";

import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const SignUpForm = () => {
  const { sendSignInLink } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSignInLink(email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="relative">
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          className="input peer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label" htmlFor="email">
          Email address
        </label>
      </div>
      <button className="signin-button mt-4">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
