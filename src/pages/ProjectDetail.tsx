import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getStoredProjects } from "@/services/storage";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { MarkdownContent } from "@/components/MarkdownContent";
import type { Project } from "@/types/content";

const ProjectDetail = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { data: projects = [] } = useQuery<Project[]>({
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

  const currentLanguage = i18n.language as keyof typeof project.content;

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <Card className="overflow-hidden max-w-4xl mx-auto">
        <div className="aspect-video">
          <img
            src={project.image}
            alt={project.title[currentLanguage]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6">
            {project.title[currentLanguage]}
          </h1>
          <div className="text-muted-foreground mb-8">
            {project.description[currentLanguage]}
          </div>
          <MarkdownContent 
            content={project.content[currentLanguage] || ''}
            className="mt-6"
          />
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetail;