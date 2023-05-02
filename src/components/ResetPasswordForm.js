"use client";

import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const ResetPasswordForm = () => {
  const { resetUserPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetUserPassword(email);
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
      <button type="submit" className="signin-button mt-4">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
