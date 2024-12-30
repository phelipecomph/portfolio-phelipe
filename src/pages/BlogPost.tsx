import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getStoredPosts } from "@/services/storage";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { MarkdownContent } from "@/components/MarkdownContent";
import type { BlogPost } from "@/types/content";

const BlogPostPage = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['posts'],
    queryFn: getStoredPosts,
  });

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <Card className="overflow-hidden max-w-4xl mx-auto">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">
            {post.title[i18n.language as keyof typeof post.title]}
          </h1>
          <p className="text-muted-foreground mb-8">
            {new Date(post.created_at).toLocaleDateString(i18n.language)}
          </p>
          <MarkdownContent 
            content={post.content[i18n.language as keyof typeof post.content]}
            className="mt-6"
          />
        </div>
      </Card>
    </div>
  );
};

export default BlogPostPage;