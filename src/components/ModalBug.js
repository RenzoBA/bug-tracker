"use client";

import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill, RiSendPlane2Fill, RiUser3Fill } from "react-icons/ri";
import BugComment from "./BugComment";
import UserSkeleton from "./UserSkeleton";

const ModalBug = ({ setOpenModalBug, bug }) => {
  const {
    currentUser,
    getDuration,
    getUserInfo,
    deleteBugReport,
    completeBugReport,
    createBugComment,
    getBugComments,
  } = useAuth();
  const [userInfo, setUserInfo] = useState("");
  const [responsable, setResponsable] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getData = async () => {
      const userInfo = await getUserInfo(bug.owner);
      setUserInfo(userInfo);

      let team = [];
      for (let i = 0; i < bug.team.length; i++) {
        const data = await getUserInfo(bug.team[i]);
        team.push(data);
      }
      setResponsable(team);

      getBugComments(bug.bid, setComments);
    };
    getData();
  }, []);

  const handleKeyDown = (e) => {
    e.key === "Escape" && setOpenModalBug(false);
  };
  const handleBackdropClick = (e) => {
    e.target === e.currentTarget && setOpenModalBug(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBugComment(bug.bid, comment);
    setComment("");
  };

  return createPortal(
    <div
      className="flex items-center justify-center min-h-screen w-full bg-black/50 absolute top-0 left-0 z-10 py-20"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col gap-5 p-10 bg-[#203a43] mx-5 rounded-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex flex-row justify-between items-center w-full hover-button text-xl">
          <label className="text-decoration">Bug Details</label>
          <button onClick={() => setOpenModalBug(false)}>
            <RiCloseFill />
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <p className="font-light text-white/50">
              {"#" + bug.tags.replaceAll(/[^A-Za-z0-9_\-']+/g, " #")}
            </p>
            <h2 className="text-3xl">{bug.title}</h2>
            <div>
              <span className="bg-white/50 px-2 rounded-full mr-2">
                {bug.priority}
              </span>
              <span>{getDuration(bug.date.seconds)}</span>
            </div>
            {bug.complete && (
              <p className="text-green-600 text-xl font-bold my-2">completed</p>
            )}
          </div>
          <hr className="border-white/5" />
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="owner" className="text-white/50 text-sm">
                owner:
              </label>
              {userInfo ? (
                <div className="flex gap-2 mt-1" id="owner">
                  {!userInfo.photoURL ? (
                    <RiUser3Fill className="text-decoration" />
                  ) : (
                    <Image
                      src={userInfo.photoURL}
                      width={50}
                      height={50}
                      alt="user-photo"
                      className="user-photo w-12 h-12"
                    />
                  )}
                  <div className="flex flex-col justify-between">
                    <p className="text-lg">{userInfo.displayName}</p>
                    <p className="text-white/50">{userInfo.email}</p>
                  </div>
                </div>
              ) : (
                <UserSkeleton />
              )}
            </div>
            <div>
              <label htmlFor="responsable" className="text-white/50 text-sm">
                responsable:
              </label>
              <div id="responsable" className="mt-1 flex flex-wrap gap-4">
                {responsable ? (
                  responsable.map((member) => (
                    <div
                      key={member.uid}
                      className="flex flex-row items-center gap-2"
                    >
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
                      <span>{`${member.displayName} ${
                        currentUser.uid === member.uid ? "(you)" : ""
                      }`}</span>
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
              <p id="date">
                {`${new Date(
                  bug.date.seconds * 1000
                ).toLocaleString()} (local)`}
              </p>
            </div>
          </div>

          <hr className="border-white/5" />
          <div className="flex justify-around">
            <button className="hover-button">update</button>
            <button
              onClick={() => completeBugReport(bug.bid, bug.complete)}
              className="hover-button"
            >
              {bug.complete ? "incomplete" : "complete"}
            </button>
            <button
              onClick={() => deleteBugReport(bug)}
              className="text-red-500/50 hover:text-red-500"
            >
              delete
            </button>
          </div>
          <hr className="border-white/5" />
          <div>
            <p className="text-xl mt-2">Comments:</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-row items-start gap-4 my-8"
            >
              <Image
                src={currentUser.photoURL}
                width={50}
                height={50}
                alt="user-photo"
                className="user-photo"
              />
              <div className="relative w-full">
                <textarea
                  required
                  id="comment"
                  name="comment"
                  rows="3"
                  placeholder="Comment"
                  className="input peer scrollbar-thin scrollbar-thumb-decoration scrollbar-track-white/10"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <label className="label" htmlFor="comment">
                  Comment
                </label>
              </div>
              <button>
                <RiSendPlane2Fill className="hover-button text-xl" />
              </button>
            </form>
            <div className="flex flex-col gap-4">
              {comments.map((comment) => (
                <BugComment key={comment.bcid} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalBug;
