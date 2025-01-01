"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminContent } from "@/components/admin/AdminContent";

const queryClient = new QueryClient();

const Admin = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "posts">("projects");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-20 animate-fadeIn">
        <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <AdminContent activeTab={activeTab} />
      </div>
    </QueryClientProvider>
  );
};

export default Admin;