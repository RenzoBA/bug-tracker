"use client";

import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";

const JoinProjectForm = () => {
  const { currentUser, joinProject } = useAuth();
  const [pid, setPid] = useState("");

  const handleChange = (e) => {
    setPid(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    joinProject(pid);
    setPid("");
  };

  return (
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
      <button type="submit" className="signin-button mt-4">
        Join Project
      </button>
    </form>
  );
};

export default JoinProjectForm;
