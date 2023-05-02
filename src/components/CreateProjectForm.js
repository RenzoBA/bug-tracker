"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { RiUser3Fill } from "react-icons/ri";

const CreateProjectForm = () => {
  const { currentUser, createProject } = useAuth();
  const [projectData, setProjectData] = useState({
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
      name: "",
      description: "",
      requirements: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-row gap-1 w-full">
        {!currentUser?.photoURL ? (
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
          className="input peer scrollbar-thin scrollbar-thumb-decoration scrollbar-track-white/10"
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
          <span className="text-xs text-white/50">(separate with commas)</span>
        </label>
      </div>

      <button type="submit" className="signin-button mt-4">
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;
