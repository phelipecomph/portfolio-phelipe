import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-6">
            {t("about.title")}
          </h1>
          
          <Card className="p-6">
            <div className="prose dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("about.skills.content")}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                {t("about.services.content")}
              </p>
            </div>
          </Card>
        </div>

        {/* Right side - Image */}
        <div className="relative h-[600px] animate-slideUp">
          <img
            src="/placeholder.svg"
            alt="Profile"
            className="h-full w-auto object-contain mx-auto"
            style={{
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;