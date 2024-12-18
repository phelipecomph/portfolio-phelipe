import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

const BlogPost = () => {
  const { id } = useParams();

  // This would come from your data source
  const post = {
    id: "1",
    title: "Getting Started with Data Science",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    content: `
      # Introduction to Data Science
      
      Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.
      
      ## Key Components
      
      1. Statistics
      2. Programming
      3. Domain Knowledge
      4. Data Visualization
      
      ## Getting Started
      
      To begin your journey in data science, focus on:
      
      - Learning Python
      - Understanding statistics
      - Practicing with real datasets
      - Building a portfolio
      
      ## Next Steps
      
      After mastering the basics, explore:
      
      - Machine Learning
      - Deep Learning
      - Big Data Technologies
    `,
  };

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <Card className="overflow-hidden max-w-4xl mx-auto">
        <div className="aspect-video">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-muted-foreground mb-8">{post.date}</p>
          <div className="prose dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogPost;