import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getStoredPosts } from "@/services/storage";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@/types/content";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['posts'],
    queryFn: getStoredPosts,
  });

  const publishedPosts = posts.filter(post => post.published);

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        {publishedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden animate-slideUp">
            <Link to={`/blog/${post.id}`}>
              <div className="p-8">
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(post.created_at).toLocaleDateString(i18n.language)}
                </p>
                <h3 className="text-3xl font-bold mb-4">
                  {post.title[i18n.language as keyof typeof post.title]}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {post.content[i18n.language as keyof typeof post.content].substring(0, 300)}...
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;