import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AdminDialog } from "./AdminDialog";
import { useTranslation } from "react-i18next";
import type { Project, BlogPost } from "@/types/content";

interface AdminActionsProps {
  activeTab: "projects" | "posts";
  onSave: (formData: FormData) => void;
  editItem: Project | BlogPost | null;
  setEditItem: (item: Project | BlogPost | null) => void;
}

export function AdminActions({ activeTab, onSave, editItem, setEditItem }: AdminActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end mb-6">
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
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
            setEditItem(null);
          }}
          onCancel={() => setEditItem(null)}
        />
      </Dialog>
    </div>
  );
}