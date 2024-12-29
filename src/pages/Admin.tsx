import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { PostForm } from "@/components/admin/PostForm";
import { AdminTable } from "@/components/admin/AdminTable";
import { getStoredProjects, getStoredPosts, saveProjects, savePosts } from "@/utils/storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"projects" | "posts">("projects");
  const [editItem, setEditItem] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: getStoredProjects,
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getStoredPosts,
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

  const handleEdit = (item: any) => {
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
        image: String(formData.get("image") || ""),
      };

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
      };

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
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">{t("admin.title")}</h1>

      <div className="flex gap-4 mb-8">
        <Button
          variant={activeTab === "projects" ? "default" : "outline"}
          onClick={() => setActiveTab("projects")}
        >
          {t("admin.projects")}
        </Button>
        <Button
          variant={activeTab === "posts" ? "default" : "outline"}
          onClick={() => setActiveTab("posts")}
        >
          {t("admin.posts")}
        </Button>
      </div>

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
                  project={editItem}
                  onSubmit={handleSave}
                  onCancel={() => setIsDialogOpen(false)}
                />
              ) : (
                <PostForm
                  post={editItem}
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
    </div>
  );
};

export default Admin;