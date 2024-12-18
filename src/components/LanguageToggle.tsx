import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "pt" : "en")}
    >
      {i18n.language === "en" ? "PT" : "EN"}
    </Button>
  );
}