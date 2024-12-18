import { useState, useEffect } from "react";
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

const STORAGE_KEYS = {
  PROJECTS: "portfolio_projects",
  POSTS: "portfolio_posts",
};

const Admin = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"projects" | "posts">("projects");
  const [editItem, setEditItem] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize state from localStorage or default values
  const [projects, setProjects] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        title: {
          en: "Data Analysis Dashboard",
          pt: "Dashboard de Análise de Dados",
        },
        description: {
          en: "A real-time analytics dashboard built with Python and React",
          pt: "Um dashboard de análise em tempo real construído com Python e React",
        },
        featured: true,
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      },
      {
        id: "2",
        title: {
          en: "Machine Learning Pipeline",
          pt: "Pipeline de Machine Learning",
        },
        description: {
          en: "Automated ML pipeline for data processing and model training",
          pt: "Pipeline automatizado de ML para processamento de dados e treinamento de modelos",
        },
        featured: false,
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      },
    ];
  });

  const [posts, setPosts] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        title: {
          en: "Getting Started with Data Science",
          pt: "Começando com Ciência de Dados",
        },
        content: {
          en: "Learn the basics of data science...",
          pt: "Aprenda o básico de ciência de dados...",
        },
        published: true,
      },
      {
        id: "2",
        title: {
          en: "Python Best Practices",
          pt: "Melhores Práticas em Python",
        },
        content: {
          en: "Tips and tricks for writing better Python code...",
          pt: "Dicas e truques para escrever melhor código Python...",
        },
        published: true,
      },
    ];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  const handleDelete = (id: string) => {
    if (activeTab === "projects") {
      setProjects(projects.filter((p) => p.id !== id));
    } else {
      setPosts(posts.filter((p) => p.id !== id));
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

  const handleSave = (formData: FormData) => {
    if (activeTab === "projects") {
      const updatedProject = {
        id: editItem?.id || String(Date.now()),
        title: {
          en: formData.get("title_en"),
          pt: formData.get("title_pt"),
        },
        description: {
          en: formData.get("description_en"),
          pt: formData.get("description_pt"),
        },
        featured: Boolean(formData.get("featured")),
        image: formData.get("image"),
      };

      if (editItem) {
        setProjects(projects.map((p) => (p.id === editItem.id ? updatedProject : p)));
      } else {
        setProjects([...projects, updatedProject]);
      }
    } else {
      const updatedPost = {
        id: editItem?.id || String(Date.now()),
        title: {
          en: formData.get("title_en"),
          pt: formData.get("title_pt"),
        },
        content: {
          en: formData.get("content_en"),
          pt: formData.get("content_pt"),
        },
        published: Boolean(formData.get("published")),
      };

      if (editItem) {
        setPosts(posts.map((p) => (p.id === editItem.id ? updatedPost : p)));
      } else {
        setPosts([...posts, updatedPost]);
      }
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