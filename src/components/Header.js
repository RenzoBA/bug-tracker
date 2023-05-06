"use client";

import { RiBug2Fill, RiUser3Fill } from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import ProjectChanger from "./ProjectChanger";

const Header = () => {
  const { currentUser } = useAuth();

  // const handleBackdropClick = (e) => {
  //   e.target == e.currentTarget && setOpenPidContainer(false);
  // };

  return (
    <div
      className="flex flex-row justify-between items-center p-3 text-white shadow backdrop-blur fixed h-16 w-full z-20"
      // onClick={handleBackdropClick}
    >
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-2xl lowercase text-decoration flex gap-1">
          <RiBug2Fill className="text-3xl" /> bug tracker
        </h1>
      </div>
      {currentUser && (
        <div className="flex flex-row items-center gap-6">
          {/* <ProjectChanger /> */}
          <Link
            href="/dashboard/user"
            className="flex flex-row items-center gap-2 text-2xl mr-3"
          >
            {currentUser.photoURL ? (
              <Image
                src={currentUser.photoURL}
                width={30}
                height={30}
                alt="user-photo"
                className="user-photo w-10 h-10"
              />
            ) : (
              <RiUser3Fill className="text-decoration" />
            )}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
