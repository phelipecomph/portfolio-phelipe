import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/content";
import type { Json } from "@/integrations/supabase/types";

export const getProjects = async (): Promise<Project[]> => {
  try {
    console.log("Fetching projects from Supabase...");
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    console.log("Projects fetched successfully:", data);
    return (data || []).map(project => ({
      ...project,
      title: project.title as unknown as Project['title'],
      description: project.description as unknown as Project['description'],
      content: project.content as unknown as Project['content'],
    }));
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw error;
  }
};

export const saveProjects = async (projects: Project[]) => {
  try {
    console.log("Saving projects to Supabase...");
    const { error } = await supabase
      .from('projects')
      .upsert(
        projects.map(project => ({
          ...project,
          title: project.title as unknown as Json,
          description: project.description as unknown as Json,
          content: project.content as unknown as Json,
        })),
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Error saving projects:', error);
      throw error;
    }

    console.log("Projects saved successfully");
  } catch (error) {
    console.error('Error in saveProjects:', error);
    throw error;
  }
};