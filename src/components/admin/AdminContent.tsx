import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import { PostForm } from "./PostForm";
import { AdminTable } from "./AdminTable";
import { saveProjects, getProjects } from "@/services/projects";
import { savePosts, getPosts } from "@/services/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Project, BlogPost } from "@/types/content";

interface AdminContentProps {
  activeTab: "projects" | "posts";
}

export function AdminContent({ activeTab }: AdminContentProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState<Project | BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const handleDelete = async (id: string) => {
    if (activeTab === "projects") {
      const updatedProjects = projects.filter((p) => p.id !== id);
      await saveProjects(updatedProjects);
      queryClient.setQueryData(['projects'], updatedProjects);
    } else {
      const updatedPosts = posts.filter((p) => p.id !== id);
      await savePosts(updatedPosts);
      queryClient.setQueryData(['posts'], updatedPosts);
    }
    toast({
      title: "Success",
      description: `Item deleted successfully`,
    });
  };

  const handleEdit = (item: Project | BlogPost) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async (formData: FormData) => {
    if (activeTab === "projects") {
      const updatedProject = {
        id: editItem?.id || crypto.randomUUID(),
        title: {
          en: String(formData.get("title_en") || ""),
          pt: String(formData.get("title_pt") || ""),
        },
        description: {
          en: String(formData.get("description_en") || ""),
          pt: String(formData.get("description_pt") || ""),
        },
        featured: formData.get("featured") === "on",
        published: formData.get("published") === "on",
        image: String(formData.get("image") || ""),
        created_at: editItem?.created_at || new Date().toISOString(),
      } as Project;

      const updatedProjects = editItem
        ? projects.map((p) => (p.id === editItem.id ? updatedProject : p))
        : [...projects, updatedProject];

      await saveProjects(updatedProjects);
      queryClient.setQueryData(['projects'], updatedProjects);
    } else {
      const updatedPost = {
        id: editItem?.id || crypto.randomUUID(),
        title: {
          en: String(formData.get("title_en") || ""),
          pt: String(formData.get("title_pt") || ""),
        },
        content: {
          en: String(formData.get("content_en") || ""),
          pt: String(formData.get("content_pt") || ""),
        },
        published: formData.get("published") === "on",
        created_at: editItem?.created_at || new Date().toISOString(),
      } as BlogPost;

      const updatedPosts = editItem
        ? posts.map((p) => (p.id === editItem.id ? updatedPost : p))
        : [...posts, updatedPost];

      await savePosts(updatedPosts);
      queryClient.setQueryData(['posts'], updatedPosts);
    }

    setIsDialogOpen(false);
    setEditItem(null);
    toast({
      title: "Success",
      description: `Item ${editItem ? "updated" : "created"} successfully`,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem(null)}>
              {activeTab === "projects" ? t("admin.addProject") : t("admin.addPost")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editItem
                  ? activeTab === "projects"
                    ? t("admin.editProject")
                    : t("admin.editPost")
                  : activeTab === "projects"
                  ? t("admin.addProject")
                  : t("admin.addPost")}
              </DialogTitle>
            </DialogHeader>
            {activeTab === "projects" ? (
              <ProjectForm
                project={editItem as Project}
                onSubmit={handleSave}
                onCancel={() => setIsDialogOpen(false)}
              />
            ) : (
              <PostForm
                post={editItem as BlogPost}
                onSubmit={handleSave}
                onCancel={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <AdminTable
        items={activeTab === "projects" ? projects : posts}
        type={activeTab}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Card>
  );
}