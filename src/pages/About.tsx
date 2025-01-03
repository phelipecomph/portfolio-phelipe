import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {t("about.title")}
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t("about.bio.title")}</h2>
          <p className="text-muted-foreground">{t("about.bio.content")}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t("about.skills.title")}</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t("about.skills.content")}</p>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">{t("about.experience.title")}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">{t("about.experience.content")}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;