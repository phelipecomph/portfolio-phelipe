import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const { t } = useTranslation();

  // This would come from your data source
  const featuredProject = {
    id: "1",
    title: "Data Analysis Dashboard",
    description: "A real-time analytics dashboard built with Python and React",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Phelipe</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {t("hero.title")}
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          {t("hero.description")}
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t("featured.title")}
        </h2>
        <Card className="overflow-hidden animate-slideUp">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{featuredProject.title}</h3>
              <p className="text-muted-foreground mb-6">
                {featuredProject.description}
              </p>
              <Button asChild className="w-fit">
                <Link to={`/projects/${featuredProject.id}`}>Learn More</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Index;