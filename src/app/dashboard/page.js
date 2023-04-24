"use client";

import CardBug from "@/components/CardBug";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiBug2Fill } from "react-icons/ri";

const Dashboard = () => {
  const { currentPid, getBugReports } = useAuth();
  const [bugReports, setBugReports] = useState([]);

  useEffect(() => {
    getBugReports(setBugReports);
  }, [currentPid]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center min-h-screen w-full py-16 pl-[4.5rem]">
      {bugReports.length ? (
        bugReports.map((bug) => <CardBug bug={bug} key={bug.bid} />)
      ) : (
        <div className="text-white text-center">
          <p className="text-lg">
            Hi there! Welcome to{" "}
            <span className="text-decoration flex gap-1 items-center justify-center text-3xl">
              <RiBug2Fill className="text-4xl" /> bug tracker
            </span>
          </p>
          <p className="font-light text-lg mt-3 text-white/50">
            You can{" "}
            <Link
              href="/dashboard/report_incident"
              className="link text-base font-normal text-white/70"
            >
              add bugs
            </Link>{" "}
            or see the{" "}
            <Link
              href="/dashboard/project"
              className="link text-base font-normal text-white/70"
            >
              current project
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
