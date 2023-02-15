"use client";

import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";

const ModalUserInfo = ({ setOpenModalUserInfo }) => {
  const { currentUser, updateUserInfo } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(displayName, photoURL);
    setOpenModalUserInfo(false);
  };

  return createPortal(
    <div className="flex items-center justify-center min-h-screen w-full bg-black/50 absolute top-0 left-0 z-10">
      <div className="flex flex-col gap-5 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <div className="flex flex-row justify-between items-center w-full text-white/50 text-xl">
          <label className="text-decoration">Update User</label>
          <button onClick={() => setOpenModalUserInfo(false)}>
            <RiCloseFill />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 pt-5"
        >
          <div className="relative flex items-center justify-center">
            <input
              id="image_upload"
              name="image_upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                setPhotoURL(URL.createObjectURL(e.currentTarget.files[0]))
              }
              className="hidden"
            />
            {photoURL ? (
              <div className="flex flex-col gap-2 items-center justify-center">
                <Image
                  src={photoURL}
                  width={50}
                  height={50}
                  alt="user-photo"
                  className="user-photo"
                />
                <label
                  htmlFor="image_upload"
                  className=" text-xs text-white/50 cursor-pointer border-2 border-white/50 p-1 rounded-lg h-fit hover:text-white"
                >
                  Change photo
                </label>
              </div>
            ) : (
              <label
                htmlFor="image_upload"
                className=" text-white/50 cursor-pointer border-2 border-white/50 p-2 rounded-lg"
              >
                Upload photo (png, jpg)
              </label>
            )}
          </div>
          <div className="relative">
            <input
              id="display-name"
              type="text"
              placeholder="Display name"
              className="input peer"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <label className="label">Display name</label>
          </div>
          <button className="signin-button mt-4">Update</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalUserInfo;
