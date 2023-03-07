import { createPortal } from "react-dom";

const Modal = ({ children, setOpenModal }) => {
  setTimeout(() => {
    setOpenModal(false);
  }, 3000);

  return createPortal(
    <div className="bg-[#203a43] fixed bottom-5 left-5 border-l-4 border-decoration text-white p-4">
      {children}
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
