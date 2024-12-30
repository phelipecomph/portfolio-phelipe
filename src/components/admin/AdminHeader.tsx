import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  activeTab: "projects" | "posts";
  onTabChange: (tab: "projects" | "posts") => void;
}

export function AdminHeader({ activeTab, onTabChange }: AdminHeaderProps) {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-4xl font-bold mb-12 text-center">{t("admin.title")}</h1>
      <div className="flex gap-4 mb-8">
        <Button
          variant={activeTab === "projects" ? "default" : "outline"}
          onClick={() => onTabChange("projects")}
        >
          {t("admin.projects")}
        </Button>
        <Button
          variant={activeTab === "posts" ? "default" : "outline"}
          onClick={() => onTabChange("posts")}
        >
          {t("admin.posts")}
        </Button>
      </div>
    </>
  );
}