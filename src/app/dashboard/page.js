"use client";

import CardBug from "@/components/CardBug";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { currentUser, logOut, getBugReports } = useAuth();
  const [bugReports, setBugReports] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getBugReports(setBugReports);
  }, []);

  console.log(bugReports);

  if (currentUser) {
    return (
      <div className="flex flex-wrap gap-3 items-center justify-center min-h-screen w-full pt-16 pl-[4.5rem]">
        {bugReports.map((bug) => (
          <CardBug bug={bug} key={bug.id} />
        ))}
        <button className="p-2 border" onClick={logOut}>
          log Out
        </button>
      </div>
    );
  }
  if (!currentUser) {
    router.push("/");
  }
};

export default Dashboard;
