"use client";

import { ThemeContext } from "@/app/theme-provider";
import Link from "next/link";
import { useContext } from "react";
import {
  RiHome2Fill,
  RiAlertFill,
  RiTeamFill,
  RiUser3Fill,
} from "react-icons/ri";

const Sidebar = () => {
  const { categorySelected, setCategorySelected } = useContext(ThemeContext);

  console.log("AAA", categorySelected);

  return (
    <div className="flex flex-col gap-5 justify-start items-center pt-20 backdrop-blur shadow fixed h-full w-[4.5rem] text-[0.6rem]">
      <Link
        className={`section ${
          categorySelected === "dashboard" && "text-decoration"
        }`}
        href="/dashboard"
        onClick={() => setCategorySelected("dashboard")}
      >
        <RiHome2Fill className="text-2xl" />
        <label>Dashboard</label>
      </Link>
      <Link
        className={`section ${
          categorySelected === "report" && "text-decoration"
        }`}
        href="/dashboard/report_incident"
        onClick={() => setCategorySelected("report")}
      >
        <RiAlertFill className="text-2xl" />
        <label>Report</label>
      </Link>
      <Link
        className={`section ${
          categorySelected === "team" && "text-decoration"
        }`}
        href="/dashboard/team"
        onClick={() => setCategorySelected("team")}
      >
        <RiTeamFill className="text-2xl" />
        <label>Team</label>
      </Link>
      <Link
        className={`section ${
          categorySelected === "user" && "text-decoration"
        }`}
        href="/dashboard/user"
        onClick={() => setCategorySelected("user")}
      >
        <RiUser3Fill className="text-2xl" />
        <label>User</label>
      </Link>
    </div>
  );
};

export default Sidebar;