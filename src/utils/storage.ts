// Define types for our data structures
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
}

export interface BlogPost {
  id: string;
  title: LocalizedContent;
  content: LocalizedContent;
  published: boolean;
}

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  POSTS: 'portfolio_posts',
};

// Helper functions
export const getStoredProjects = (): Project[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return stored ? JSON.parse(stored) : [];
};

export const getStoredPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
  return stored ? JSON.parse(stored) : [];
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

export const savePosts = (posts: BlogPost[]) => {
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
};

// Initialize with default data if storage is empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
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
    saveProjects(defaultProjects);
  }

  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
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
    savePosts(defaultPosts);
  }
};