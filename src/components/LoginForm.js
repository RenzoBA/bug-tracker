"use client";

import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const LoginForm = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
    setEmail("");
    setPassword("");
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
      <div className="relative">
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          minLength={6}
          className="input peer"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Password
        </label>
      </div>
      <button type="submit" className="signin-button mt-4">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
