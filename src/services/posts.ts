import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/types/content";
import type { Json } from "@/integrations/supabase/types";

export const getPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    title: post.title as unknown as BlogPost['title'],
    content: post.content as unknown as BlogPost['content'],
    description: post.description as unknown as BlogPost['description'],
  }));
};

export const savePosts = async (posts: BlogPost[]) => {
  const { error } = await supabase
    .from('posts')
    .upsert(
      posts.map(post => ({
        ...post,
        title: post.title as unknown as Json,
        content: post.content as unknown as Json,
        description: post.description as unknown as Json,
      })),
      { onConflict: 'id' }
    );

  if (error) {
    console.error('Error saving posts:', error);
    throw error;
  }
};