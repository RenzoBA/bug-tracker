"use client";

import CardBug from "@/components/CardBug";
import SearchBar from "@/components/SearchBar";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { RiBug2Fill } from "react-icons/ri";

const Dashboard = () => {
  const { currentUser, currentPid, getBugReports } = useAuth();
  const [bugReports, setBugReports] = useState([]);
  const [tagsToFilter, setTagsToFilter] = useState([]);
  const [titleToFilter, setTitleToFilter] = useState("");

  useEffect(() => {
    getBugReports(setBugReports, tagsToFilter, titleToFilter);
  }, [currentPid, tagsToFilter, titleToFilter]);

  if (currentUser && !currentPid) {
    redirect("/create_project");
  } else if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full py-20 pl-[4.5rem]">
      <div className="flex flex-col justify-start items-center gap-10 w-full h-full px-10 py-5">
        {/* <SearchBar
          tagsToFilter={tagsToFilter}
          setTagsToFilter={setTagsToFilter}
          titleToFilter={titleToFilter}
          setTitleToFilter={setTitleToFilter}
        /> */}
        <hr className="border-white/5 w-full" />
        <div className="flex flex-wrap gap-3 items-start justify-center w-full h-full">
          {bugReports.length ? (
            bugReports.map((bug) => <CardBug bug={bug} key={bug.bid} />)
          ) : (
            <div className="text-white text-center flex flex-col justify-center items-center w-full h-full">
              <p className="text-xl">
                Hi there! Welcome to{" "}
                <span className="text-decoration flex gap-1 items-center justify-center text-4xl">
                  <RiBug2Fill className="text-5xl" /> bug tracker
                </span>
              </p>
              <p className="font-light text-xl mt-3 text-white/50">
                You can{" "}
                <Link
                  href="/dashboard/report_incident"
                  className="link text-lg font-normal text-white/70"
                >
                  add bugs
                </Link>{" "}
                or see the{" "}
                <Link
                  href="/dashboard/project"
                  className="link text-lg font-normal text-white/70"
                >
                  current project
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
