"use client";

import CardProject from "@/components/CardProject";
import ModalUserInfo from "@/components/ModalUserInfo";
import ModalUserPassword from "@/components/ModalUserPassword";
import ProjectSkeleton from "@/components/ProjectSkeleton";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiPencilFill, RiUser3Fill } from "react-icons/ri";

const DashboardUser = () => {
  const { currentUser, removeUser, getProjectInfo, logOut } = useAuth();
  const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
  const [openModalUserPassword, setOpenModalUserPassword] = useState(false);
  const [projectsInfo, setProjectsInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        let projects = [];
        for (let i = 0; i < currentUser.pids.length; i++) {
          const data = await getProjectInfo(currentUser.pids[i]);
          projects.push(data);
        }
        setProjectsInfo(projects);
      };
      getData();
    }
  }, [currentUser, getProjectInfo]);

  if (currentUser) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full py-20 pl-[4.5rem]">
        <div className="flex gap-5">
          {!currentUser.photoURL ? (
            <RiUser3Fill className="text-decoration text-6xl" />
          ) : (
            <Image
              src={currentUser.photoURL}
              width={140}
              height={140}
              alt="user-photo"
              className="user-photo"
            />
          )}
          <div className="flex flex-col items-start">
            <div className="flex flex-row gap-3 items-center">
              <h2 className="text-6xl font-semibold">
                {currentUser.displayName}
              </h2>
              <button
                onClick={() => setOpenModalUserInfo(true)}
                className="text-5xl text-white/50 hover:text-white"
              >
                <RiPencilFill />
              </button>
              {openModalUserInfo && (
                <ModalUserInfo
                  setOpenModalUserInfo={setOpenModalUserInfo}
                  currentUser={currentUser}
                />
              )}
            </div>
            <h3 className="text-2xl">{currentUser.email}</h3>
            <div className="flex flex-col items-start">
              <>
                <button
                  onClick={() => setOpenModalUserPassword(true)}
                  className="text-white/50 hover:text-white"
                >
                  Change Password
                </button>
                {openModalUserPassword && (
                  <ModalUserPassword
                    setOpenModalUserPassword={setOpenModalUserPassword}
                  />
                )}
              </>
              <button
                onClick={removeUser}
                className="text-red-500/50 hover:text-red-500 "
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl">Your projects: </p>
          <div className="flex flex-wrap items-center gap-2">
            {projectsInfo ? (
              projectsInfo.map((project) => (
                <CardProject project={project} key={project.pid} />
              ))
            ) : (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            )}
          </div>
        </div>
        <button
          className="signin-button w-40 border-white/50 hover:border-white"
          onClick={logOut}
        >
          log Out
        </button>
      </div>
    );
  }
  if (!currentUser) {
    router.push("/");
  }
};

export default DashboardUser;
