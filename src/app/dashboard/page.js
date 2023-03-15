"use client";

import CardBug from "@/components/CardBug";
import { useAuth } from "@/context/AuthProvider";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { currentPid, logOut, getBugReports } = useAuth();
  const [bugReports, setBugReports] = useState([]);

  useEffect(() => {
    getBugReports(setBugReports);
  }, [currentPid]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center min-h-screen w-full py-16 pl-[4.5rem]">
      {bugReports.map((bug) => (
        <CardBug bug={bug} key={bug.bid} />
      ))}
      <button className="p-2 border" onClick={logOut}>
        log Out
      </button>
    </div>
  );
};

export default Dashboard;
