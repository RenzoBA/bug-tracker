"use client";

import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const DashboardLayout = ({ children }) => {
  const { currentUser, currentPid, modal, setModal, setOpenPidContainer } =
    useAuth();
  const router = useRouter();

  const handleBackdropClick = () => {
    setOpenPidContainer(false);
  };

  if (currentUser && currentPid) {
    return (
      <div className="flex flex-row" onClick={handleBackdropClick}>
        <Sidebar />
        {children}
        {modal.open && <Modal modal={modal} setModal={setModal} />}
      </div>
    );
  } else if (currentUser && !currentPid) {
    router.push("/create_project");
  } else if (!currentUser) {
    router.push("/");
  }
};

export default DashboardLayout;
