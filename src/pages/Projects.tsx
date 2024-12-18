import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getStoredProjects } from "@/utils/storage";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const projects = getStoredProjects();

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">{t("projects.title")}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
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