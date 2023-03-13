"use client";

import Link from "next/link";
import { useState } from "react";
import { RiBug2Fill } from "react-icons/ri";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

const Signup = () => {
  const { currentUser, sendSignInLink, modal, setModal } = useAuth();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSignInLink("http://localhost:3000/update_user", email);
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
            <button className="signin-button mt-4">Sign Up</button>
          </form>
          <p className="text-white/50 text-sm text-center font-extralight italic">
            Please check your email inbox and follow the link.
          </p>
          <div className="w-full flex flex-row justify-between">
            <Link href="/" className="link">
              Log In
            </Link>
          </div>
        </div>
        {modal.open && <Modal modal={modal} setModal={setModal} />}
      </div>
    );
  }
  if (currentUser) {
    router.push("/dashboard");
  }
};

export default Signup;
