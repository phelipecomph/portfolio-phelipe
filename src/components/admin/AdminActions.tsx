import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AdminDialog } from "./AdminDialog";
import { useTranslation } from "react-i18next";
import type { Project, BlogPost } from "@/types/content";

interface AdminActionsProps {
  activeTab: "projects" | "posts";
  onSave: (formData: FormData) => void;
}

export function AdminActions({ activeTab, onSave }: AdminActionsProps) {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Project | BlogPost | null>(null);

  return (
    <div className="flex justify-end mb-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setEditItem(null)}>
            {activeTab === "projects" ? t("admin.addProject") : t("admin.addPost")}
          </Button>
        </DialogTrigger>
        <AdminDialog
          activeTab={activeTab}
          editItem={editItem}
          onSubmit={(formData) => {
            onSave(formData);
            setIsDialogOpen(false);
          }}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
}