"use client";

import Link from "next/link";
import {
  RiHome2Fill,
  RiAlertFill,
  RiTeamFill,
  RiUser3Fill,
} from "react-icons/ri";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname().split("/");

  return (
    <nav className="flex flex-col gap-5 justify-start items-center pt-20 backdrop-blur shadow fixed h-full w-[4.5rem] text-[0.6rem] z-10">
      <Link
        className={`section ${
          path.at(-1) === "dashboard" && "text-decoration"
        }`}
        href="/dashboard"
      >
        <RiHome2Fill className="text-2xl" />
        <label>Dashboard</label>
      </Link>
      <Link
        className={`section ${
          path.at(-1) === "report_incident" && "text-decoration"
        }`}
        href="/dashboard/report_incident"
      >
        <RiAlertFill className="text-2xl" />
        <label>Report</label>
      </Link>
      <Link
        className={`section ${path.at(-1) === "project" && "text-decoration"}`}
        href="/dashboard/project"
      >
        <RiTeamFill className="text-2xl" />
        <label>Project</label>
      </Link>
      <Link
        className={`section ${path.at(-1) === "user" && "text-decoration"}`}
        href="/dashboard/user"
      >
        <RiUser3Fill className="text-2xl" />
        <label>User</label>
      </Link>
    </nav>
  );
};

export default Sidebar;
