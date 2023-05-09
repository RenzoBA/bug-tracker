"use client";

import { useAuth } from "@/context/AuthProvider";
import { redirect } from "next/navigation";
import Link from "next/link";
import CreateProjectForm from "@/components/CreateProjectForm";
import LogoutButton from "@/components/LogoutButton";

const CreateProject = () => {
  const { currentUser, setOpenPidContainer } = useAuth();
  // const router = useRouter();

  const handleBackdropClick = () => {
    setOpenPidContainer(false);
  };

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen py-16"
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col gap-3 items-center p-10 bg-[#203a43] rounded-none sm:rounded-md w-full sm:w-[28rem]">
        <h2 className="text-3xl sm:text-5xl py-2 lowercase text-decoration flex gap-1">
          Create Project
        </h2>
        <CreateProjectForm />
        <div className="w-full flex flex-row justify-between">
          <Link href="/join_project" className="link">
            Join project
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
