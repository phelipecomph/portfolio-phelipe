import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
      "hero.title": "Data Scientist & Python Developer",
      "hero.description": "Transforming data into insights and building powerful solutions",
      "featured.title": "Featured Project",
      "contact.title": "Get in Touch",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send Message",
      "admin.title": "Admin Panel",
      "admin.projects": "Manage Projects",
      "admin.posts": "Manage Posts",
    }
  },
  pt: {
    translation: {
      "nav.home": "Início",
      "nav.projects": "Projetos",
      "nav.blog": "Blog",
      "nav.contact": "Contato",
      "hero.title": "Cientista de Dados & Desenvolvedor Python",
      "hero.description": "Transformando dados em insights e construindo soluções poderosas",
      "featured.title": "Projeto em Destaque",
      "contact.title": "Entre em Contato",
      "contact.name": "Nome",
      "contact.email": "Email",
      "contact.message": "Mensagem",
      "contact.send": "Enviar Mensagem",
      "admin.title": "Painel Admin",
      "admin.projects": "Gerenciar Projetos",
      "admin.posts": "Gerenciar Posts",
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