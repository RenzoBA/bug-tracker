"use client";

import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiBug2Fill,
  RiUser3Fill,
} from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const {
    currentUser,
    currentPid,
    setCurrentPid,
    getProjectInfo,
    setCategorySelected,
    openPidContainer,
    setOpenPidContainer,
  } = useAuth();
  const [projectsInfo, setProjectsInfo] = useState([]);
  const [currentProject, setCurrentProject] = useState("");

  useEffect(() => {
    if (currentUser && currentPid) {
      const getData = async () => {
        const { name } = await getProjectInfo(currentPid);
        setCurrentProject(name);
      };
      getData();
    }
  }, [currentUser, currentPid]);

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        let projects = [];
        for (let i = 0; i < currentUser.pids.length; i++) {
          const { name, pid } = await getProjectInfo(currentUser.pids[i]);
          projects.push({
            name,
            pid,
          });
        }
        setProjectsInfo(projects);
      };
      getData();
    }
  }, [currentUser, currentPid]);

  const handleBackdropClick = (e) => {
    e.target === e.currentTarget && setOpenPidContainer(false);
  };

  const handleCurrentProject = async (project) => {
    setCurrentProject(project.name);
    setOpenPidContainer(false);
    setCurrentPid(project.pid);
    // setCategorySelected("dashboard");
  };

  return (
    <div
      className="flex flex-row justify-between items-center p-3 text-white shadow backdrop-blur fixed h-16 w-full z-20"
      onClick={handleBackdropClick}
    >
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-2xl lowercase text-decoration flex gap-1">
          <RiBug2Fill className="text-3xl" /> bug tracker
        </h1>
      </div>
      <div>
        <div className="flex flex-row items-center gap-6">
          {currentUser && currentPid && (
            <div className="relative">
              <button
                className="flex flex-row items-center justify-between p-2 text-left w-52"
                onClick={() => setOpenPidContainer(!openPidContainer)}
              >
                <div>
                  <h2>
                    {currentProject.length > 15
                      ? `${currentProject.slice(0, 15)}...`
                      : currentProject}
                  </h2>
                </div>
                <span>
                  {openPidContainer ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                </span>
              </button>
              <ul
                className={`${
                  openPidContainer ? "flex" : "hidden"
                } flex-col gap-1 absolute p-2 w-full bg-primary rounded-lg`}
              >
                {projectsInfo.map((project) => (
                  <button
                    // href="/dashboard"
                    key={project.pid}
                    onClick={() => handleCurrentProject(project)}
                    className={`${
                      currentPid === project.pid &&
                      currentProject !== "create/join project" &&
                      "text-decoration"
                    } text-left`}
                  >
                    <h2>
                      {project.name.length > 15
                        ? `${project.name.slice(0, 15)}...`
                        : project.name}
                    </h2>
                    <p className="text-sm font-light text-white/50">
                      {`${project.pid.slice(0, 5)}.....${project.pid.slice(
                        -5
                      )}`}
                    </p>
                  </button>
                ))}
                <hr className="border-white/5" />
                <Link
                  href="/create_project"
                  onClick={() => {
                    setCurrentProject("create/join project");
                    setOpenPidContainer(false);
                  }}
                  className={`${
                    currentProject === "create/join project"
                      ? "text-decoration"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  + create/join project
                </Link>
              </ul>
            </div>
          )}
          {currentUser && (
            <Link
              href="/dashboard/user"
              onClick={() => setCategorySelected("user")}
              className="flex flex-row items-center gap-2 text-2xl mr-3"
            >
              {!currentUser.photoURL ? (
                <RiUser3Fill className="text-decoration" />
              ) : (
                <Image
                  src={currentUser.photoURL}
                  width={30}
                  height={30}
                  alt="user-photo"
                  className="user-photo w-10 h-10"
                />
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
