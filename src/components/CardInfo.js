import Image from "next/image";
import { useState } from "react";
import {
  RiFileCopyLine,
  RiPencilFill,
  RiProfileFill,
  RiUser3Fill,
} from "react-icons/ri";
import ModalUserInfo from "./ModalUserInfo";
import ModalUserPassword from "./ModalUserPassword";
import { useAuth } from "@/context/AuthProvider";
import ModalProjectInfo from "./ModalProjectInfo";
import ClipboardJS from "clipboard";

const CardInfo = ({ type, user, project }) => {
  const { currentPid, removeUser, removeProject, setModal } = useAuth();
  const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
  const [openModalUserPassword, setOpenModalUserPassword] = useState(false);
  const [openModalProjectInfo, setOpenModalProjectInfo] = useState(false);

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

  if (type === "user") {
    return (
      <div className="flex gap-5">
        {!user.photoURL ? (
          <RiUser3Fill className="text-decoration text-6xl" />
        ) : (
          <Image
            src={user.photoURL}
            width={140}
            height={140}
            alt="user-photo"
            className="object-cover rounded w-32 h-32"
          />
        )}
        <div className="flex flex-col items-start justify-between">
          <div>
            <div className="flex flex-row gap-3 items-center text-5xl">
              <h2 className="font-semibold">{user.displayName}</h2>
              <button
                onClick={() => setOpenModalUserInfo(true)}
                className="text-white/50 hover:text-white"
              >
                <RiPencilFill />
              </button>
              {openModalUserInfo && (
                <ModalUserInfo
                  setOpenModalUserInfo={setOpenModalUserInfo}
                  user={user}
                />
              )}
            </div>
            <h3 className="text-xl">{user.email}</h3>
          </div>
          <div className="flex flex-col items-start text-sm">
            <button
              onClick={() => setOpenModalUserPassword(true)}
              className="text-white/50 hover:text-white"
            >
              Change Password
            </button>
            <button
              onClick={removeUser}
              className="text-red-500/50 hover:text-red-500 "
            >
              Delete Account
            </button>
            {openModalUserPassword && (
              <ModalUserPassword
                setOpenModalUserPassword={setOpenModalUserPassword}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === "project") {
    return (
      <div className="flex gap-5">
        {!project.photoURL ? (
          <RiProfileFill className="text-decoration text-6xl" />
        ) : (
          <Image
            src={project.photoURL}
            width={140}
            height={140}
            alt="project-photo"
            className="object-cover rounded w-32 h-32"
          />
        )}
        <div className="flex flex-col items-start justify-between">
          <div>
            <div className="flex flex-row gap-3 items-center text-5xl">
              <h2 className="font-semibold">{project.name}</h2>

              {user?.uid === project.owner && (
                <button
                  onClick={() => setOpenModalProjectInfo(true)}
                  className="text-white/50 hover:text-white"
                >
                  <RiPencilFill />
                </button>
              )}

              {openModalProjectInfo && (
                <ModalProjectInfo
                  setOpenModalProjectInfo={setOpenModalProjectInfo}
                  project={project}
                />
              )}
            </div>
            <div className="flex flex-row gap-3 items-center text-xl mt-2">
              <h3>{`${currentPid.slice(0, 5)}.....${currentPid.slice(-5)}`}</h3>
              {user?.uid === project.owner && (
                <button
                  onClick={handleCopy}
                  className="text-white/50 hover:text-white"
                >
                  <RiFileCopyLine />
                </button>
              )}
            </div>
          </div>
          {user?.uid === project.owner && (
            <div className="flex flex-col items-start text-sm">
              <button
                onClick={removeProject}
                className="text-red-500/50 hover:text-red-500"
              >
                Delete Project
              </button>
              {openModalUserPassword && (
                <ModalUserPassword
                  setOpenModalUserPassword={setOpenModalUserPassword}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CardInfo;
