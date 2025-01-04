export interface LocalizedContent {
  en: string;
  pt: string;
}

export interface Project {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  content: LocalizedContent;
  image: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  display_order: number;
}

export interface BlogPost {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  content: LocalizedContent;
  published: boolean;
  created_at: string;
  display_order: number;
}