"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";
import Link from "next/link";

const CreateProject = () => {
  const { currentUser, createProject } = useAuth();
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    date: Date.now(),
    owner: currentUser.uid,
    name: "",
    description: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(projectData);
    setProjectData({
      date: Date.now(),
      owner: currentUser.uid,
      name: "",
      description: "",
      requirements: "",
      team: [currentUser.uid],
    });
    router.push("/dashboard");
  };

  if (currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
          <h2 className="text-3xl sm:text-5xl py-2 lowercase text-decoration flex gap-1">
            Create Project
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
                <label className="label-2" htmlFor="owner">
                  Owner
                </label>
                <p
                  id="owner"
                  name="owner"
                  className="text-base sm:text-lg uppercase px-2 select-none"
                >
                  {currentUser.displayName}
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                required
                id="name"
                name="name"
                type="text"
                placeholder="Project"
                className="input peer"
                value={projectData.name}
                onChange={handleChange}
              />
              <label className="label" htmlFor="name">
                Project
              </label>
            </div>
            <div className="relative">
              <textarea
                required
                id="description"
                name="description"
                rows="5"
                placeholder="Description"
                className="input peer"
                value={projectData.description}
                onChange={handleChange}
              />
              <label className="label" htmlFor="description">
                Description
              </label>
            </div>
            <div className="relative">
              <input
                required
                id="requirements"
                name="requirements"
                type="text"
                placeholder="Requirements"
                className="input peer"
                value={projectData.requirements}
                onChange={handleChange}
              />
              <label className="label" htmlFor="requirements">
                Requirements{" "}
                <span className="text-xs text-white/50">
                  (separate with commas)
                </span>
              </label>
            </div>

            <button className="signin-button mt-4">Create Project</button>
          </form>
          <Link href={"/join_project"} className="link">
            Join project
          </Link>
        </div>
      </div>
    );
  }
  router.push("/");
};

export default CreateProject;
