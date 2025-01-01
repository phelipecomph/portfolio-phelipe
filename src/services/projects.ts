import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/content";
import type { Json } from "@/integrations/supabase/types";

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (data || []).map(project => ({
    ...project,
    title: project.title as unknown as Project['title'],
    description: project.description as unknown as Project['description'],
    content: project.content as unknown as Project['content'],
  }));
};

export const saveProjects = async (projects: Project[]) => {
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
};