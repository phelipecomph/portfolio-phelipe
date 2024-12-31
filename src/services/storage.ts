import { supabase } from "@/integrations/supabase/client";
import type { Project, BlogPost, LocalizedContent } from "@/types/content";
import type { Json } from "@/integrations/supabase/types";

interface RawProject {
  id: string;
  title: Json;
  description: Json;
  image: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

interface RawBlogPost {
  id: string;
  title: Json;
  content: Json;
  description: Json;
  published: boolean;
  created_at: string;
}

interface LocalizedJson {
  en?: string;
  pt?: string;
  [key: string]: Json | undefined;
}

const transformLocalizedContent = (json: Json): LocalizedContent => {
  if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
    const localizedJson = json as LocalizedJson;
    return {
      en: String(localizedJson.en || ''),
      pt: String(localizedJson.pt || '')
    };
  }
  return { en: '', pt: '' };
};

export const initializeStorage = async () => {
  const { data: projects } = await supabase.from("projects").select("*");
  const { data: posts } = await supabase.from("posts").select("*");
  
  if (!projects || !posts) {
    console.error("Failed to initialize storage");
    return;
  }
};

export const getStoredProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) throw error;
  
  return (data as RawProject[] || []).map(project => ({
    ...project,
    title: transformLocalizedContent(project.title),
    description: transformLocalizedContent(project.description)
  }));
};

export const getStoredPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) throw error;
  
  return (data as RawBlogPost[] || []).map(post => ({
    ...post,
    title: transformLocalizedContent(post.title),
    content: transformLocalizedContent(post.content),
    description: transformLocalizedContent(post.description)
  }));
};