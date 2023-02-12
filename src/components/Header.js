"use client";

import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider";

import { RiBug2Fill, RiUser3Fill } from "react-icons/ri";
import Image from "next/image";

const Header = () => {
  const { user, categorySelected } = useContext(ThemeContext);

  console.log("USER", user);

  return (
    <div className="flex flex-row justify-between items-center p-3 text-white backdrop-blur shadow fixed h-16 w-full z-10">
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-2xl lowercase text-decoration flex gap-1">
          <RiBug2Fill className="text-3xl" /> bug tracker
        </h1>
        <p className="text-white/50 font-light font-sm tracking-wider">
          / {categorySelected}
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 text-2xl">
        {!user ? (
          <RiUser3Fill className="text-white/50" />
        ) : user.photoURL ? (
          <Image src={user.photoURL} width={10} height={10} alt="user-photo" />
        ) : (
          <RiUser3Fill className="text-decoration" />
        )}
      </div>
    </div>
  );
};

export default Header;
