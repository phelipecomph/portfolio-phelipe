import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Blog = () => {
  const { t } = useTranslation();

  // This would come from your data source
  const posts = [
    {
      id: "1",
      title: "Getting Started with Data Science",
      excerpt: "A beginner's guide to starting your data science journey",
      date: "2024-02-20",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    {
      id: "2",
      title: "Python Best Practices",
      excerpt: "Tips and tricks for writing better Python code",
      date: "2024-02-15",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden animate-slideUp">
            <Link to={`/blog/${post.id}`}>
              <div className="aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;