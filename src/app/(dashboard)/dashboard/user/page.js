"use client";

import CardInfo from "@/components/CardInfo";
import CardProject from "@/components/CardProject";
import ProjectSkeleton from "@/components/ProjectSkeleton";
import { useAuth } from "@/context/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardUser = () => {
  const { currentUser, getProjectInfo, logOut } = useAuth();

  const [projectsInfo, setProjectsInfo] = useState("");

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

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full py-20 pl-[4.5rem]">
      <div className="flex flex-col items-center gap-10 w-3/4">
        <h2 className="text-3xl sm:text-5xl lowercase text-decoration">
          User Info
        </h2>
        <p>
          All your information is here. You can change your username, profile
          photo, password or delete your account.
        </p>
        <CardInfo type="user" user={currentUser} />
        <div className="flex flex-col gap-4 self-start">
          <p className="text-white/50">Your projects: </p>
          <div className="flex flex-wrap items-center gap-2">
            {projectsInfo ? (
              projectsInfo.map((project) => (
                <CardProject project={project} key={project.pid} />
              ))
            ) : (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            )}
          </div>
        </div>
        <button
          className="signin-button w-full border-white/50 hover:border-white"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardUser;
