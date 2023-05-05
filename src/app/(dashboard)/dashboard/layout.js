"use client";

import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <section className="flex flex-row">
      <Sidebar />
      {children}
    </section>
  );
};

export default DashboardLayout;
