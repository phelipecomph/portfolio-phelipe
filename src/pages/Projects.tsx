import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const { t } = useTranslation();

  // This would come from your data source
  const projects = [
    {
      id: "1",
      title: "Data Analysis Dashboard",
      description: "A real-time analytics dashboard built with Python and React",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      id: "2",
      title: "Machine Learning Pipeline",
      description: "Automated ML pipeline for predictive analytics",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden animate-slideUp">
            <div className="aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-muted-foreground mb-6">{project.description}</p>
              <Button asChild>
                <Link to={`/projects/${project.id}`}>View Project</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;