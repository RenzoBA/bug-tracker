"use client";

import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

const ModalUserPassword = ({ setOpenModalUserPassword }) => {
  const { updateUserPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleKeyDown = (e) => {
    e.key === "Escape" && setOpenModalUserPassword(false);
  };

  const handleBackdropClick = (e) => {
    e.target === e.currentTarget && setOpenModalUserPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserPassword(password);
    setOpenModalUserPassword(false);
  };

  return createPortal(
    <div
      className="flex items-center justify-center min-h-screen w-full bg-black/50 absolute top-0 left-0 z-10"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <div className="flex flex-row justify-between items-center w-full text-white/50 text-xl">
          <label className="text-decoration">Update Password</label>
          <button onClick={() => setOpenModalUserPassword(false)}>
            <RiCloseFill />
          </button>
        </div>
        <form
          onSubmit={
            password === confirmPassword
              ? handleSubmit
              : (e) => e.preventDefault()
          }
          className="w-full flex flex-col gap-6 pt-5"
        >
          <div className="relative">
            <input
              required
              autoFocus
              id="password"
              type="password"
              placeholder="Password"
              minLength={6}
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
              minLength={6}
              className="input peer"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="label">Confirm password</label>
          </div>
          {password !== confirmPassword && (
            <p className="text-white/50 text-sm">Passwords do not match</p>
          )}
          <button className="signin-button mt-4">Update</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalUserPassword;
