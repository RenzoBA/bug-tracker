"use client";

import Sidebar from "@/components/Sidebar";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "../theme-provider";

const Dashboard = () => {
  const router = useRouter();
  const { user, setUser } = useContext(ThemeContext);

  const logout = async () => {
    try {
      await signOut(auth);
      // setUser("");
      router.push("/");
    } catch (error) {
      alert("error logout");
    }
  };

  console.log("currentuser: ", auth.currentUser);

  return (
    <div className="flex items-center justify-center min-h-screen pt-16 pl-[4.5rem]">
      <button className="p-2 border" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Dashboard;
