"use client";

import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

const ModalProjectInfo = ({ projectInfo, setOpenModalProjectInfo }) => {
  const { updateProjectInfo } = useAuth();
  const [project, setProject] = useState({
    name: projectInfo.name,
    description: projectInfo.description,
    requirements: projectInfo.requirements,
  });

  const handleKeyDown = (e) => {
    e.key === "Escape" && setOpenModalProjectInfo(false);
  };

  const handleBackdropClick = (e) => {
    e.target === e.currentTarget && setOpenModalProjectInfo(false);
  };

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProjectInfo(project);
    setOpenModalProjectInfo(false);
  };

  return createPortal(
    <div
      className="flex items-center justify-center min-h-screen w-full bg-black/50 absolute top-0 left-0 z-10"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] mx-5 rounded-md w-full sm:w-[40rem]">
        <div className="flex flex-row justify-between items-center w-full text-white/50 text-xl">
          <label className="text-decoration">Update Project</label>
          <button onClick={() => setOpenModalProjectInfo(false)}>
            <RiCloseFill />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 pt-5"
        >
          <div className="relative">
            <input
              autoFocus
              minLength={3}
              id="name"
              type="text"
              placeholder="Project"
              className="input peer"
              value={project.name}
              onChange={handleChange}
            />
            <label className="label" htmlFor="name">
              Project
            </label>
          </div>
          <div className="relative">
            <textarea
              id="description"
              rows="5"
              placeholder="Description"
              className="input peer scrollbar-thin scrollbar-thumb-decoration scrollbar-track-white/10"
              value={project.description}
              onChange={handleChange}
            />
            <label className="label" htmlFor="description">
              Description
            </label>
          </div>
          <div className="relative">
            <input
              id="requirements"
              name="requirements"
              type="text"
              placeholder="Requirements"
              className="input peer"
              value={project.requirements}
              onChange={handleChange}
            />
            <label className="label" htmlFor="requirements">
              Requirements{" "}
              <span className="text-xs text-white/50">
                (separate with commas)
              </span>
            </label>
          </div>
          <button className="signin-button mt-4">Update</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalProjectInfo;
