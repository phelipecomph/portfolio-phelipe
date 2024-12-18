import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface Project {
  id: string;
  title: { en: string; pt: string };
  description: { en: string; pt: string };
  featured: boolean;
  image: string;
}

interface Post {
  id: string;
  title: { en: string; pt: string };
  content: { en: string; pt: string };
  published: boolean;
}

const Admin = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"projects" | "posts">("projects");
  const [editItem, setEditItem] = useState<Project | Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // This would come from your data source
  const [projects, setProjects] = useState<Project[]>([
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
  ]);

  const [posts, setPosts] = useState<Post[]>([
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
  ]);

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

  const handleEdit = (item: Project | Post) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = (formData: FormData) => {
    if (activeTab === "projects") {
      const updatedProject: Project = {
        id: editItem?.id || String(Date.now()),
        title: {
          en: formData.get("title_en") as string,
          pt: formData.get("title_pt") as string,
        },
        description: {
          en: formData.get("description_en") as string,
          pt: formData.get("description_pt") as string,
        },
        featured: Boolean(formData.get("featured")),
        image: formData.get("image") as string,
      };

      if (editItem) {
        setProjects(projects.map((p) => (p.id === editItem.id ? updatedProject : p)));
      } else {
        setProjects([...projects, updatedProject]);
      }
    } else {
      const updatedPost: Post = {
        id: editItem?.id || String(Date.now()),
        title: {
          en: formData.get("title_en") as string,
          pt: formData.get("title_pt") as string,
        },
        content: {
          en: formData.get("content_en") as string,
          pt: formData.get("content_pt") as string,
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
                Add {activeTab === "projects" ? "Project" : "Post"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editItem ? "Edit" : "Add"} {activeTab === "projects" ? "Project" : "Post"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(new FormData(e.currentTarget));
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title (English)</label>
                    <Input
                      name="title_en"
                      defaultValue={
                        editItem ? (editItem as Project | Post).title.en : ""
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title (Portuguese)</label>
                    <Input
                      name="title_pt"
                      defaultValue={
                        editItem ? (editItem as Project | Post).title.pt : ""
                      }
                      required
                    />
                  </div>
                </div>

                {activeTab === "projects" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">
                          Description (English)
                        </label>
                        <Textarea
                          name="description_en"
                          defaultValue={
                            editItem ? (editItem as Project).description.en : ""
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Description (Portuguese)
                        </label>
                        <Textarea
                          name="description_pt"
                          defaultValue={
                            editItem ? (editItem as Project).description.pt : ""
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Image URL</label>
                      <Input
                        name="image"
                        defaultValue={editItem ? (editItem as Project).image : ""}
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        name="featured"
                        defaultChecked={editItem ? (editItem as Project).featured : false}
                      />
                      <label className="text-sm font-medium">Featured Project</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">
                          Content (English)
                        </label>
                        <Textarea
                          name="content_en"
                          defaultValue={
                            editItem ? (editItem as Post).content.en : ""
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Content (Portuguese)
                        </label>
                        <Textarea
                          name="content_pt"
                          defaultValue={
                            editItem ? (editItem as Post).content.pt : ""
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        name="published"
                        defaultChecked={editItem ? (editItem as Post).published : false}
                      />
                      <label className="text-sm font-medium">Published</label>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {activeTab === "projects" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title ({i18n.language.toUpperCase()})</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title[i18n.language as "en" | "pt"]}</TableCell>
                  <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title ({i18n.language.toUpperCase()})</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title[i18n.language as "en" | "pt"]}</TableCell>
                  <TableCell>{post.published ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default Admin;