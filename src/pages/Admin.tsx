import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminContent } from "@/components/admin/AdminContent";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "posts">("projects");

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <AdminContent activeTab={activeTab} />
    </div>
  );
};

export default Admin;