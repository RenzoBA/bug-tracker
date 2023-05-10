// "use client";

import { RiBug2Fill, RiUser3Fill } from "react-icons/ri";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import ProjectChanger from "./ProjectChanger";

const Header = () => {
  // const { currentUser } = useAuth();

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
      <ProjectChanger />
    </div>
  );
};

export default Header;
