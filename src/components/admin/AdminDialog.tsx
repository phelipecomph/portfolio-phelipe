import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import { PostForm } from "./PostForm";
import type { Project, BlogPost } from "@/types/content";

interface AdminDialogProps {
  activeTab: "projects" | "posts";
  editItem: Project | BlogPost | null;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function AdminDialog({ activeTab, editItem, onSubmit, onCancel }: AdminDialogProps) {
  return (
    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {editItem
            ? activeTab === "projects"
              ? "Edit Project"
              : "Edit Post"
            : activeTab === "projects"
            ? "Add Project"
            : "Add Post"}
        </DialogTitle>
      </DialogHeader>
      {activeTab === "projects" ? (
        <ProjectForm
          project={editItem as Project}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      ) : (
        <PostForm
          post={editItem as BlogPost}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </DialogContent>
  );
}