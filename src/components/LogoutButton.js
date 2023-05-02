"use client";

import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogoutButton = () => {
  const { logOut } = useAuth();

  return (
    <button className="link flex flex-row gap-1 items-center" onClick={logOut}>
      <RiLogoutBoxRLine className="text-xl" /> log out
    </button>
  );
};

export default LogoutButton;
