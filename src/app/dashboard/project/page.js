"use client";

import ModalProjectInfo from "@/components/ModalProjectInfo";
import UserSkeleton from "@/components/UserSkeleton";
import { useAuth } from "@/context/AuthProvider";
import ClipboardJS from "clipboard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiFileCopyLine, RiPencilFill, RiUser3Fill } from "react-icons/ri";

const DashboardTeam = () => {
  const {
    currentUser,
    currentPid,
    getUserInfo,
    getProjectInfo,
    getBugsResume,
    setModal,
    removeProject,
    getDuration,
  } = useAuth();

  const [projectInfo, setProjectInfo] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projectTeam, setProjectTeam] = useState("");
  const [bugResume, setBugResume] = useState([]);
  const [openModalProjectInfo, setOpenModalProjectInfo] = useState(false);

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
  }, [openModalProjectInfo, currentPid]);

  const handleCopy = (event) => {
    const clipboard = new ClipboardJS(event.currentTarget, {
      text: () => currentPid,
    });
    clipboard.on("success", () => {
      setModal({
        open: true,
        title: "PID copied",
        description: "Share it with your teammates to join this project.",
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-20 pl-[4.5rem]">
      <div className="flex flex-col gap-10 w-3/4">
        <div>
          {currentUser.uid === projectOwner.uid ? (
            <>
              {projectInfo ? (
                <div className="flex flex-row gap-3 items-center">
                  <h1 className="text-6xl font-semibold">{projectInfo.name}</h1>
                  <button
                    onClick={() => setOpenModalProjectInfo(true)}
                    className="text-5xl text-white/50 hover:text-white"
                  >
                    <RiPencilFill />
                  </button>
                  {openModalProjectInfo && (
                    <ModalProjectInfo
                      setOpenModalProjectInfo={setOpenModalProjectInfo}
                      projectInfo={projectInfo}
                    />
                  )}
                </div>
              ) : (
                <div className="h-16 w-80 rounded-full bg-primary/50 animate-pulse" />
              )}
              <button
                className="text-2xl copy-button flex flex-row gap-1 items-center mt-2"
                onClick={handleCopy}
              >
                {`${currentPid.slice(0, 5)}.....${currentPid.slice(-5)}`}
                <RiFileCopyLine className="text-3xl" />
              </button>
              <button
                onClick={removeProject}
                className="text-red-500/50 hover:text-red-500 mt-4"
              >
                Delete Project
              </button>
            </>
          ) : (
            <>
              {projectInfo ? (
                <h1 className="text-6xl font-semibold">{projectInfo.name}</h1>
              ) : (
                <div className="h-16 w-80 rounded-full bg-primary/50 animate-pulse" />
              )}
              <span className="text-2xl copy-button flex flex-row gap-1 items-center">{`${currentPid.slice(
                0,
                5
              )}.....${currentPid.slice(-5)}`}</span>
            </>
          )}
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
            <h2 className="title mb-2">total bugs:</h2>
            <span className="text-6xl">{bugResume.length}</span>
          </div>
          <div>
            <h2 className="title mb-2">bugs complete:</h2>
            <span className="text-6xl">
              {bugResume.filter((bug) => bug.complete === true).length}
            </span>
          </div>
          <div>
            <h2 className="title mb-2">pending bugs:</h2>
            <span className="text-6xl">
              {bugResume.filter((bug) => bug.complete !== true).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeam;
