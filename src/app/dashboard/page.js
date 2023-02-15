"use client";

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { currentUser, logOut } = useAuth();
  const router = useRouter();

  // const handleLogout = () => {
  //   logOut();
  // };

  if (currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16 pl-[4.5rem]">
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
