import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
      <Modal />
    </div>
  );
};

export default DashboardLayout;
