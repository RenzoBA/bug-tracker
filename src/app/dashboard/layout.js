import Sidebar from "@/components/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
