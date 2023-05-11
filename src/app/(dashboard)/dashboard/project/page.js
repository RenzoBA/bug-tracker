"use client";

import CardInfo from "@/components/CardInfo";
import UserSkeleton from "@/components/UserSkeleton";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";

const DashboardTeam = () => {
  const {
    currentUser,
    currentPid,
    getUserInfo,
    getProjectInfo,
    getBugReports,
    getDuration,
    getTags,
  } = useAuth();

  const [projectInfo, setProjectInfo] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [projectTeam, setProjectTeam] = useState("");
  const [totalBugs, setTotalBugs] = useState([]);
  const [tagsProject, setTagsProject] = useState([]);

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

      await getBugReports(setTotalBugs);
    };
    getData();
  }, [currentPid, getProjectInfo]);

  useEffect(() => {
    getTags(setTagsProject);
  }, [getTags]);

  if (!currentUser) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-20 pl-[4.5rem]">
      <div className="flex flex-col items-center gap-10 w-3/4">
        <h2 className="text-3xl sm:text-5xl lowercase text-decoration">
          Project Info
        </h2>
        <p>
          All the information of current project is here. You can change its
          name, description and requirements if you are the owner.
        </p>
        <CardInfo type="project" user={currentUser} project={projectInfo} />
        <div className="self-start flex flex-col gap-4">
          <div>
            <label htmlFor="owner" className="text-white/50">
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
                    className="user-photo w-12 h-12"
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
            <label htmlFor="team" className="text-white/50">
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
                        className="user-photo w-12 h-12"
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
                  <UserSkeleton />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between rounded-lg bg-secondary w-full p-5 text-center">
          <div>
            <h2 className="title mb-2">total bugs:</h2>
            <span className="text-6xl">{totalBugs.length}</span>
          </div>
          <div>
            <h2 className="title mb-2">bugs complete:</h2>
            <span className="text-6xl">
              {totalBugs.filter((bug) => bug.complete === true).length}
            </span>
          </div>
          <div>
            <h2 className="title mb-2">pending bugs:</h2>
            <span className="text-6xl">
              {totalBugs.filter((bug) => bug.complete !== true).length}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-5">
          <div className="flex flex-col gap-2 rounded-lg bg-secondary w-1/2 h-full px-5 py-3">
            <div>
              <label htmlFor="tags" className="title">
                tags:
              </label>
              <div className="flex flex-wrap gap-1 mt-1">
                {tagsProject.map((tag) => (
                  <span
                    key={tag.tid}
                    className="text-sm font-light bg-[#41575f] px-2 rounded-sm text-white/50"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default DashboardTeam;
