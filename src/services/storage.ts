import { supabase } from "@/integrations/supabase/client";
import type { Project, BlogPost } from "@/types/content";

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
  return data || [];
};

export const getStoredPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) throw error;
  return data || [];
};