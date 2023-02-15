"use client";

import ModalUserInfo from "@/components/ModalUserInfo";
import ModalUserPassword from "@/components/ModalUserPassword";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiPencilFill, RiUser3Fill } from "react-icons/ri";

const DashboardUser = () => {
  const { currentUser, removeUser } = useAuth();
  const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
  const [openModalUserPassword, setOpenModalUserPassword] = useState(false);
  const router = useRouter();

  if (currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full pt-16 pl-[4.5rem]">
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
              <h2 className="text-6xl uppercase font-semibold">
                {currentUser.displayName ? currentUser.displayName : "no-name"}
              </h2>
              <button
                onClick={() => setOpenModalUserInfo(true)}
                className="text-5xl text-white/50 hover:text-white"
              >
                <RiPencilFill />
              </button>
              {openModalUserInfo && (
                <ModalUserInfo setOpenModalUserInfo={setOpenModalUserInfo} />
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
      </div>
    );
  }
  if (!currentUser) {
    router.push("/");
  }
};

export default DashboardUser;
