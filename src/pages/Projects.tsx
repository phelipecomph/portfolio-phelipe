import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getProjects } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  
  const { data: projects = [], error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    onError: (error) => {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Filter only published projects
  const publishedProjects = projects.filter(project => project.published);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-12 text-center text-red-500">
          {t("errors.failedToLoad")}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">{t("projects.title")}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {publishedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden animate-slideUp">
            <Link to={`/projects/${project.id}`}>
              <div className="aspect-video">
                <img
                  src={project.image}
                  alt={project.title[i18n.language as keyof typeof project.title]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  {project.title[i18n.language as keyof typeof project.title]}
                </h3>
                <p className="text-muted-foreground">
                  {project.description[i18n.language as keyof typeof project.description]}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;