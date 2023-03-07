"use client";

import Modal from "@/components/Modal";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiBug2Fill } from "react-icons/ri";

const PasswordReset = () => {
  const { currentUser, resetUserPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [openModalPasswordReset, setOpenModalPasswordReset] = useState(false);
  const [openModalUserNotFound, setOpenModalUserNotFound] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetUserPassword(
      email,
      setOpenModalPasswordReset,
      setOpenModalUserNotFound
    );
    setEmail("");
  };
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
          <h2 className="text-2xl lowercase text-decoration flex gap-1">
            bug tracker <RiBug2Fill className="text-3xl" />
          </h2>
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
            <button className="signin-button mt-4">Reset Password</button>
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
        {openModalPasswordReset && (
          <Modal setOpenModal={setOpenModalPasswordReset}>
            <p className="font-bold">Password reset successful</p>
            <p>Please check your email inbox.</p>
          </Modal>
        )}
        {openModalUserNotFound && (
          <Modal setOpenModal={setOpenModalUserNotFound}>
            <p className="font-bold">User not found</p>
            <p>Please enter a correct email.</p>
          </Modal>
        )}
      </div>
    );
  }
  if (currentUser) {
    router.push("/dashboard");
  }
};

export default PasswordReset;
