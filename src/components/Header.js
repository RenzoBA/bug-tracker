"use client";

import { RiBug2Fill, RiUser3Fill } from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

const Header = () => {
  const { currentUser, setCategorySelected } = useAuth();

  return (
    <div className="flex flex-row justify-between items-center p-3 text-white shadow backdrop-blur fixed h-16 w-full z-20">
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-2xl lowercase text-decoration flex gap-1">
          <RiBug2Fill className="text-3xl" /> bug tracker
        </h1>
      </div>
      <Link
        href="/dashboard/user"
        onClick={() => setCategorySelected("user")}
        className="flex flex-row items-center gap-2 text-2xl mr-3"
      >
        {currentUser &&
          (!currentUser.photoURL ? (
            <RiUser3Fill className="text-decoration" />
          ) : (
            <Image
              src={currentUser.photoURL}
              width={30}
              height={30}
              alt="user-photo"
              className="user-photo"
            />
          ))}
      </Link>
    </div>
  );
};

export default Header;
