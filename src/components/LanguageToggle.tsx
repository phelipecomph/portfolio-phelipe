import { useTranslation } from "react-i18next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <ToggleGroup
      type="single"
      value={i18n.language}
      onValueChange={(value) => {
        if (value) i18n.changeLanguage(value);
      }}
      className="border rounded-md"
    >
      <ToggleGroupItem
        value="pt"
        aria-label="Portuguese"
        className="px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        PT
      </ToggleGroupItem>
      <ToggleGroupItem
        value="en"
        aria-label="English"
        className="px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      >
        EN
      </ToggleGroupItem>
    </ToggleGroup>
  );
}