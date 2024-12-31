import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleButtonProps {
  currentLanguage: "en" | "pt";
  onToggle: () => void;
}

export function LanguageToggleButton({ currentLanguage, onToggle }: LanguageToggleButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      {currentLanguage === "en" ? "EN" : "PT"}
    </Button>
  );
}