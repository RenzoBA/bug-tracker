"use client";

import { useAuth } from "@/context/AuthProvider";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import JoinProjectForm from "@/components/JoinProjectForm";
import { redirect } from "next/navigation";

const JoinProject = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-3xl sm:text-5xl py-2 lowercase text-decoration flex gap-1">
          Join Project
        </h2>
        <JoinProjectForm />
        <div className="w-full flex flex-row justify-between">
          <Link href="/create_project" className="link">
            Create project
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default JoinProject;
