"use client";

import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

const ModalBug = ({ setOpenModalBug, bug }) => {
  const { getDuration, getUserInfo, deleteBugReport, completeBugReport } =
    useAuth();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(bug.owner);
      setUserInfo(data);
    };
    getData();
  }, []);

  console.log("modal");

  const handleKeyDown = (e) => {
    e.key === "Escape" && setOpenModalBug(false);
  };
  const handleBackdropClick = (e) => {
    e.target === e.currentTarget && setOpenModalBug(false);
  };

  return createPortal(
    <div
      className="flex items-center justify-center min-h-screen w-full bg-black/50 absolute top-0 left-0 z-10"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col gap-5 p-10 bg-[#203a43] mx-5 rounded-md w-full md:w-3/4 lg:w-2/3 xl:1/2">
        <div className="flex flex-row justify-between items-center w-full text-white/50 text-xl">
          <label className="text-decoration">Bug Details</label>
          <button onClick={() => setOpenModalBug(false)}>
            <RiCloseFill />
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <p className="font-light text-white/50">
              {"#" + bug.tags.replaceAll(/[^A-Za-z0-9_']+/g, " #")}
            </p>
            <h2 className="text-3xl">{bug.title}</h2>
            <div>
              <span className="bg-white/50 px-2 rounded-full mr-2">
                {bug.priority}
              </span>
              <span>{getDuration(bug.date, Date.now())}</span>
            </div>
            {bug.complete && (
              <p className="text-green-600 text-xl font-bold my-2">completed</p>
            )}
          </div>
          <hr className="border-white/5" />
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="resume" className="text-white/50 text-sm">
                owner:
              </label>
              <div className="flex gap-2">
                <Image
                  src={userInfo.photoURL}
                  width={50}
                  height={50}
                  alt="user-photo"
                  className="user-photo mt-1"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg">{userInfo.displayName}</p>
                  <p className="text-white/50">{userInfo.email}</p>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="resume" className="text-white/50 text-sm">
                resume:
              </label>
              <p id="resume">{bug.resume}</p>
            </div>
            <div>
              <label htmlFor="description" className="text-white/50 text-sm">
                description:
              </label>
              <p id="description">{bug.description}</p>
            </div>
            <div>
              <label htmlFor="date" className="text-white/50 text-sm">
                date:
              </label>
              <p id="date">{new Date(bug.date).toUTCString()}</p>
            </div>
          </div>
          <hr className="border-white/5" />
          <div className="flex justify-around">
            <button className="text-white/50 hover:text-white">update</button>
            <button
              onClick={() => completeBugReport(bug.bid, bug.complete)}
              className="text-white/50 hover:text-white"
            >
              {bug.complete ? "incomplete" : "complete"}
            </button>
            <button
              onClick={() => deleteBugReport(bug.bid)}
              className="text-red-500/50 hover:text-red-500"
            >
              delete
            </button>
          </div>
          <hr className="border-white/5" />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalBug;
