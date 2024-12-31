import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface LanguageToggleButtonProps {
  currentLanguage: "en" | "pt";
  onToggle: () => void;
}

export function LanguageToggleButton({ currentLanguage, onToggle }: LanguageToggleButtonProps) {
  return (
    <ToggleGroup
      type="single"
      value={currentLanguage}
      onValueChange={(value) => {
        if (value && value !== currentLanguage) onToggle();
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