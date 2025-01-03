import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
      "nav.about": "About",
      "hero.title": "Data Scientist & Python Developer",
      "hero.description": "Transforming complex data into actionable insights and building powerful solutions that drive innovation",
      "projects.title": "Projects",
      "featured.title": "Featured Project",
      "index.viewProjects": "View Projects",
      "contact.title": "Get in Touch",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send Message",
      "admin.title": "Admin Panel",
      "admin.projects": "Manage Projects",
      "admin.posts": "Manage Posts",
      "admin.addProject": "Add Project",
      "admin.addPost": "Add Post",
      "admin.editProject": "Edit Project",
      "admin.editPost": "Edit Post",
      "admin.save": "Save",
      "admin.cancel": "Cancel",
      "admin.delete": "Delete",
      "admin.edit": "Edit",
      "admin.titleEn": "Title (English)",
      "admin.titlePt": "Title (Portuguese)",
      "admin.descriptionEn": "Description (English)",
      "admin.descriptionPt": "Description (Portuguese)",
      "admin.contentEn": "Content (English)",
      "admin.contentPt": "Content (Portuguese)",
      "admin.featured": "Featured",
      "admin.published": "Published",
      "admin.imageUrl": "Image URL",
      "about.title": "About Me",
      "about.bio.title": "Bio",
      "about.bio.content": "Data Scientist and Python Developer with a passion for transforming complex data into actionable insights. Experienced in machine learning, data analysis, and building scalable solutions.",
      "about.skills.title": "Skills",
      "about.skills.content": "Python, Machine Learning, Data Analysis, SQL, Cloud Computing (AWS, GCP), Deep Learning, Natural Language Processing, Data Visualization",
      "about.experience.title": "Experience",
      "about.experience.content": "Over 5 years of experience in data science and software development, working with various industries including finance, healthcare, and technology. Led multiple successful projects delivering innovative solutions using cutting-edge technologies."
    }
  },
  pt: {
    translation: {
      "nav.home": "Início",
      "nav.projects": "Projetos",
      "nav.blog": "Blog",
      "nav.contact": "Contato",
      "nav.about": "Sobre",
      "hero.title": "Cientista de Dados & Desenvolvedor Python",
      "hero.description": "Transformando dados complexos em insights acionáveis e construindo soluções poderosas que impulsionam a inovação",
      "featured.title": "Projeto em Destaque",
      "index.viewProjects": "Projetos",
      "projects.title": "Projetos",
      "contact.title": "Entre em Contato",
      "contact.name": "Nome",
      "contact.email": "Email",
      "contact.message": "Mensagem",
      "contact.send": "Enviar Mensagem",
      "admin.title": "Painel Admin",
      "admin.projects": "Gerenciar Projetos",
      "admin.posts": "Gerenciar Posts",
      "admin.addProject": "Adicionar Projeto",
      "admin.addPost": "Adicionar Post",
      "admin.editProject": "Editar Projeto",
      "admin.editPost": "Editar Post",
      "admin.save": "Salvar",
      "admin.cancel": "Cancelar",
      "admin.delete": "Deletar",
      "admin.edit": "Editar",
      "admin.titleEn": "Título (Inglês)",
      "admin.titlePt": "Título (Português)",
      "admin.descriptionEn": "Descrição (Inglês)",
      "admin.descriptionPt": "Descrição (Português)",
      "admin.contentEn": "Conteúdo (Inglês)",
      "admin.contentPt": "Conteúdo (Português)",
      "admin.featured": "Destaque",
      "admin.published": "Publicado",
      "admin.imageUrl": "URL da Imagem",
      "about.title": "Sobre Mim",
      "about.bio.title": "Bio",
      "about.bio.content": "Cientista de Dados e Desenvolvedor Python com paixão por transformar dados complexos em insights acionáveis. Experiência em machine learning, análise de dados e construção de soluções escaláveis.",
      "about.skills.title": "Habilidades",
      "about.skills.content": "Python, Machine Learning, Análise de Dados, SQL, Computação em Nuvem (AWS, GCP), Deep Learning, Processamento de Linguagem Natural, Visualização de Dados",
      "about.experience.title": "Experiência",
      "about.experience.content": "Mais de 5 anos de experiência em ciência de dados e desenvolvimento de software, trabalhando com várias indústrias, incluindo finanças, saúde e tecnologia. Liderou múltiplos projetos bem-sucedidos entregando soluções inovadoras usando tecnologias de ponta."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;