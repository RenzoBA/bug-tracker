"use client";

import { useAuth } from "@/context/AuthProvider";
import { createPortal } from "react-dom";

const Modal = () => {
  const { modal, setModal } = useAuth();

  setTimeout(() => {
    setModal({
      ...modal,
      open: false,
    });
  }, 5000);

  if (modal.open) {
    return createPortal(
      <div className="z-20 bg-[#203a43] fixed bottom-5 left-5 border-l-4 border-decoration text-white p-4">
        <p className="font-bold">{modal.title}</p>
        <p>{modal.description}</p>
      </div>,
      document.getElementById("modal")
    );
  }
};

export default Modal;
