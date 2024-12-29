import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export interface LocalizedContent {
  en: string;
  pt: string;
}

export interface Project {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  image: string;
  featured: boolean;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: LocalizedContent;
  content: LocalizedContent;
  published: boolean;
  created_at?: string;
}

export const getStoredProjects = async (): Promise<Project[]> => {
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
    title: project.title as LocalizedContent,
    description: project.description as LocalizedContent,
  }));
};

export const getStoredPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    title: post.title as LocalizedContent,
    content: post.content as LocalizedContent,
  }));
};

export const saveProjects = async (projects: Project[]) => {
  const { error } = await supabase
    .from('projects')
    .upsert(projects.map(project => ({
      ...project,
      title: project.title as any,
      description: project.description as any,
    })), { onConflict: 'id' });

  if (error) {
    console.error('Error saving projects:', error);
  }
};

export const savePosts = async (posts: BlogPost[]) => {
  const { error } = await supabase
    .from('posts')
    .upsert(posts.map(post => ({
      ...post,
      title: post.title as any,
      content: post.content as any,
    })), { onConflict: 'id' });

  if (error) {
    console.error('Error saving posts:', error);
  }
};

// Initialize with default data if empty
export const initializeStorage = async () => {
  const projects = await getStoredProjects();
  const posts = await getStoredPosts();

  if (projects.length === 0) {
    const defaultProjects: Project[] = [
      {
        id: "1",
        title: {
          en: "Data Analysis Dashboard",
          pt: "Dashboard de Análise de Dados",
        },
        description: {
          en: "A real-time analytics dashboard built with Python and React",
          pt: "Um dashboard de análise em tempo real construído com Python e React",
        },
        featured: true,
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      },
      {
        id: "2",
        title: {
          en: "Machine Learning Pipeline",
          pt: "Pipeline de Machine Learning",
        },
        description: {
          en: "Automated ML pipeline for data processing and model training",
          pt: "Pipeline automatizado de ML para processamento de dados e treinamento de modelos",
        },
        featured: false,
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      },
    ];
    await saveProjects(defaultProjects);
  }

  if (posts.length === 0) {
    const defaultPosts: BlogPost[] = [
      {
        id: "1",
        title: {
          en: "Getting Started with Data Science",
          pt: "Começando com Ciência de Dados",
        },
        content: {
          en: "Learn the basics of data science...",
          pt: "Aprenda o básico de ciência de dados...",
        },
        published: true,
      },
      {
        id: "2",
        title: {
          en: "Python Best Practices",
          pt: "Melhores Práticas em Python",
        },
        content: {
          en: "Tips and tricks for writing better Python code...",
          pt: "Dicas e truques para escrever melhor código Python...",
        },
        published: true,
      },
    ];
    await savePosts(defaultPosts);
  }
};