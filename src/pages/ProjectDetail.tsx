import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getStoredProjects } from "@/utils/storage";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

const ProjectDetail = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: getStoredProjects,
  });

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <Card className="overflow-hidden max-w-4xl mx-auto">
        <div className="aspect-video">
          <img
            src={project.image}
            alt={project.title[i18n.language as keyof typeof project.title]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6">
            {project.title[i18n.language as keyof typeof project.title]}
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              {project.description[i18n.language as keyof typeof project.description]}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetail;