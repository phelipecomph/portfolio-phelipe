import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ProjectDetail = () => {
  const { id } = useParams();

  // This would come from your data source
  const project = {
    id: "1",
    title: "Data Analysis Dashboard",
    description: "A real-time analytics dashboard built with Python and React",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    content: `
      # Project Overview
      
      This dashboard provides real-time analytics for business metrics.
      
      ## Technologies Used
      
      - Python
      - React
      - TensorFlow
      - PostgreSQL
      
      ## Key Features
      
      - Real-time data processing
      - Interactive visualizations
      - Predictive analytics
      - Custom reporting
      
      ## Results
      
      The dashboard has helped improve decision-making efficiency by 40%.
    `,
  };

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <Card className="overflow-hidden max-w-4xl mx-auto">
        <div className="aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              {project.description}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: project.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetail;