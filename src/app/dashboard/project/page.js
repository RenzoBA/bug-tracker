"use client";

import UserSkeleton from "@/components/UserSkeleton";
import { useAuth } from "@/context/AuthProvider";
import ClipboardJS from "clipboard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiFileCopyLine, RiUser3Fill } from "react-icons/ri";

const DashboardTeam = () => {
  const {
    currentUser,
    currentPid,
    getUserInfo,
    getProjectInfo,
    getBugsResume,
    setModal,
    getDuration,
  } = useAuth();
  const [projectInfo, setProjectInfo] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projectTeam, setProjectTeam] = useState("");
  const [bugResume, setBugResume] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const projectInfo = await getProjectInfo(currentPid);
      setProjectInfo(projectInfo);

      const projectOwner = await getUserInfo(projectInfo.owner);
      setProjectOwner(projectOwner);

      let team = [];
      for (let i = 0; i < projectInfo.team.length; i++) {
        const data = await getUserInfo(projectInfo.team[i]);
        team.push(data);
      }
      setProjectTeam(team);

      await getBugsResume(setBugResume);
    };
    getData();
  }, []);

  const handleCopy = (event) => {
    const clipboard = new ClipboardJS(event.currentTarget, {
      text: () => currentPid,
    });
    clipboard.on("success", () => {
      setModal({
        open: true,
        title: "PID copied",
        description: "Project ID was copied correctly.",
      });
    });
    clipboard.on("error", () => {
      setModal({
        open: true,
        title: "PID copied error",
        description: "Project ID was not copied. Try again",
      });
    });
    clipboard.onClick(event);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full pt-16 pl-[4.5rem]">
      <div className="flex flex-col gap-10 w-3/4">
        <div>
          <h1 className="text-6xl">
            {projectInfo ? (
              projectInfo.name
            ) : (
              <div className="h-16 w-80 rounded-full bg-primary/50 animate-pulse" />
            )}
          </h1>
          <button
            className="copy-button flex flex-row gap-1 items-center text-white/50 hover:text-white"
            onClick={handleCopy}
          >
            <RiFileCopyLine className="text-xl" />
            {`${currentPid.slice(0, 5)}.....${currentPid.slice(-5)}`}
          </button>
        </div>
        <div>
          <div>
            <label htmlFor="owner" className="title">
              owner:
            </label>
            {projectOwner ? (
              <div className="flex gap-2 mt-1" id="owner">
                {!projectOwner.photoURL ? (
                  <RiUser3Fill className="text-decoration" />
                ) : (
                  <Image
                    src={projectOwner.photoURL}
                    width={50}
                    height={50}
                    alt="user-photo"
                    className="user-photo"
                  />
                )}
                <div className="flex flex-col justify-between">
                  <span className="text-lg">{`${projectOwner.displayName} ${
                    currentUser.uid === projectOwner.uid ? "(you)" : ""
                  }`}</span>
                  <p className="text-white/50">{projectOwner.email}</p>
                </div>
              </div>
            ) : (
              <UserSkeleton />
            )}
          </div>
          <div>
            <label htmlFor="team" className="title">
              team:
            </label>
            <div className="flex gap-4 mt-1" id="team">
              {projectTeam ? (
                projectTeam.map((member) => (
                  <div className="flex flex-row gap-2" key={member.uid}>
                    {!member.photoURL ? (
                      <RiUser3Fill className="text-decoration" />
                    ) : (
                      <Image
                        src={member.photoURL}
                        width={50}
                        height={50}
                        alt="user-photo"
                        className="user-photo"
                      />
                    )}
                    <div className="flex flex-col justify-between">
                      <span className="text-lg">{`${member.displayName} ${
                        currentUser.uid === member.uid ? "(you)" : ""
                      }`}</span>
                      <p className="text-white/50">{member.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <UserSkeleton />
                  <UserSkeleton />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-5">
          <div className="flex flex-col rounded-lg bg-secondary w-1/2 h-full px-5 py-3">
            <div>
              <label htmlFor="date" className="title">
                date:
              </label>
              <p id="date">{getDuration(projectInfo.date?.seconds)}</p>
            </div>
            <div>
              <label htmlFor="requirement" className="title">
                requirements:
              </label>
              <p id="requirement">{projectInfo.requirements}</p>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-secondary w-1/2 h-full px-5 py-3">
            <label htmlFor="requirement" className="title">
              description:
            </label>
            <p id="requirement">{projectInfo.description}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between rounded-lg bg-secondary w-full p-5 text-center">
          <div>
            <h2 className="title mb-1">total bugs:</h2>
            <span className="text-5xl">{bugResume.length}</span>
          </div>
          <div>
            <h2 className="title mb-1">bugs complete:</h2>
            <span className="text-5xl">
              {bugResume.filter((bug) => bug.complete === true).length}
            </span>
          </div>
          <div>
            <h2 className="title mb-1">pending bugs:</h2>
            <span className="text-5xl">
              {bugResume.filter((bug) => bug.complete !== true).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeam;
