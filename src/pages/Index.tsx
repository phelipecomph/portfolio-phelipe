import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Youtube } from "lucide-react";
import { getStoredProjects } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { t, i18n } = useTranslation();
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getStoredProjects,
  });

  const featuredProject = projects?.find(project => project.featured);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section with Geometric Shapes */}
      <section className="container mx-auto px-4 py-20 relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
        </div>

        <div className="flex flex-col items-center text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Phelipe Müller
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {t("hero.title")}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mb-12">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/projects">{t("index.viewProjects")}</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950">
              <Link to="/contact">{t("contact.title")}</Link>
            </Button>
          </div>
          <div className="flex gap-6 mt-8">
            <a
              href="https://github.com/phelipemuller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-600 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/phelipemuller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-600 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com/@phelipemuller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-600 transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      {featuredProject && (
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            {t("featured.title")}
          </h2>
          <Card className="overflow-hidden animate-slideUp hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title[i18n.language as keyof typeof featuredProject.title]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">
                  {featuredProject.title[i18n.language as keyof typeof featuredProject.title]}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {featuredProject.description[i18n.language as keyof typeof featuredProject.description]}
                </p>
                <Button asChild className="w-fit bg-purple-600 hover:bg-purple-700">
                  <Link to={`/projects/${featuredProject.id}`}>Learn More</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
};

export default Index;