"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useAuth } from "@/context/AuthProvider";

const ProjectChanger = () => {
  const { currentUser, currentPid, setCurrentPid, getProjectInfo } = useAuth();
  const [projectsInfo, setProjectsInfo] = useState([]);
  const [elementSelected, setElementSelected] = useState("");
  const [openPidContainer, setOpenPidContainer] = useState(false);

  useEffect(() => {
    if (currentUser && currentPid) {
      const getData = async () => {
        const { name } = await getProjectInfo(currentPid);
        setElementSelected(name);
      };
      getData();
    }
  }, [currentUser, currentPid, getProjectInfo]);

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
  }, [currentUser, currentPid, getProjectInfo]);

  const SelectProject = (project) => {
    setElementSelected(project.name);
    setOpenPidContainer(false);
    setCurrentPid(project.pid);
  };

  return (
    <div className="relative">
      <button
        className="relative flex flex-row items-center justify-between px-2 py-1 text-left h-10 w-60 bg-secondary rounded"
        onClick={() => setOpenPidContainer(!openPidContainer)}
      >
        <div>
          <h2>
            {elementSelected.length > 20
              ? `${elementSelected.slice(0, 20)}...`
              : elementSelected}
          </h2>
        </div>
        <span className="text-[#9ca3af] border-[#9ca3af] border-l pl-2 h-full flex items-center">
          {openPidContainer ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </span>
      </button>
      <ul
        className={`${
          openPidContainer ? "flex" : "hidden"
        } flex-col gap-2 absolute p-2 w-full bg-secondary rounded-b -mt-1 z-20 text-left`}
      >
        {projectsInfo.map((project) => (
          <Link
            key={project.pid}
            href="/dashboard"
            onClick={() => SelectProject(project)}
          >
            <h2>
              {project.name.length > 20
                ? `${project.name.slice(0, 20)}...`
                : project.name}
            </h2>
            <p className="text-sm font-light text-white/50">
              {`${project.pid.slice(0, 5)}.....${project.pid.slice(-5)}`}
            </p>
          </Link>
        ))}
        <hr className="border-white/5" />
        <Link
          href="/create_project"
          onClick={() =>
            SelectProject({ name: "+ create/join project", pid: "" })
          }
          className="text-white/50"
        >
          + create/join project
        </Link>
      </ul>
    </div>
  );
};

export default ProjectChanger;
