"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import Link from "next/link";

const JoinProject = () => {
  const { currentUser, joinProject } = useAuth();
  const router = useRouter();
  const [pid, setPid] = useState("");

  const handleChange = (e) => {
    setPid(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinProject(pid);
    setPid("");
    router.push("/dashboard");
  };

  if (currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
          <h2 className="text-3xl sm:text-5xl py-2 lowercase text-decoration flex gap-1">
            Join Project
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-row gap-1 w-full">
              {!currentUser.photoURL ? (
                <RiUser3Fill className="text-decoration" />
              ) : (
                <Image
                  src={currentUser.photoURL}
                  width={50}
                  height={50}
                  alt="user-photo"
                  className="user-photo w-12 h-12"
                />
              )}
              <div className="relative">
                <label className="label-2" htmlFor="member">
                  Member
                </label>
                <p
                  id="member"
                  name="member"
                  className="text-base sm:text-lg uppercase px-2 select-none"
                >
                  {currentUser.displayName}
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                required
                id="pid"
                name="pid"
                type="text"
                placeholder="Project ID"
                className="input peer"
                value={pid}
                onChange={handleChange}
              />
              <label className="label" htmlFor="pid">
                Project ID
              </label>
            </div>
            <button className="signin-button mt-4">Join Project</button>
          </form>
          <Link href={"/create_project"} className="link">
            Create project
          </Link>
        </div>
      </div>
    );
  }
  router.push("/");
};

export default JoinProject;
