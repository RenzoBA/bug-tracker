"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiBug2Fill } from "react-icons/ri";
import { useAuth } from "@/context/AuthProvider";
import Modal from "@/components/Modal";

const Home = () => {
  const {
    currentUser,
    currentPid,
    signIn,
    modal,
    setModal,
    setCategorySelected,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
    setCategorySelected("dashboard");
    setEmail("");
    setPassword("");
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
            <button className="signin-button mt-4">Log In</button>
          </form>
          <div className="w-full flex flex-row justify-between">
            <Link href="/signup" className="link">
              Sign Up
            </Link>
            <Link href="/reset_password" className="link">
              Forgot password?
            </Link>
          </div>
        </div>
        {modal.open && <Modal modal={modal} setModal={setModal} />}
      </div>
    );
  } else if (currentUser && !currentPid) {
    router.push("/create_project");
  } else if (currentUser && currentPid) {
    router.push("/dashboard");
  }
};

export default Home;
