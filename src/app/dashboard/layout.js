"use client";

import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthProvider";

const layout = ({ children }) => {
  const { modal, setModal } = useAuth();
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
      {modal.open && <Modal modal={modal} setModal={setModal} />}
    </div>
  );
};

export default layout;
