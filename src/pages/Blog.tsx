import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getStoredPosts } from "@/utils/storage";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const posts = getStoredPosts().filter(post => post.published);

  return (
    <div className="container mx-auto px-4 py-20 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden animate-slideUp">
            <Link to={`/blog/${post.id}`}>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date().toLocaleDateString(i18n.language)}
                </p>
                <h3 className="text-2xl font-bold mb-4">
                  {post.title[i18n.language as keyof typeof post.title]}
                </h3>
                <p className="text-muted-foreground">
                  {post.content[i18n.language as keyof typeof post.content].substring(0, 150)}...
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