"use client";

import CardBug from "@/components/CardBug";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { currentPid, getBugReports } = useAuth();
  const [bugReports, setBugReports] = useState([]);

  useEffect(() => {
    getBugReports(setBugReports);
  }, [currentPid]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center min-h-screen w-full py-16 pl-[4.5rem]">
      {bugReports.map((bug) => (
        <CardBug bug={bug} key={bug.bid} />
      ))}
    </div>
  );
};

export default Dashboard;
