import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface MarkdownButtonProps {
  icon: LucideIcon;
  title: string;
  onClick: (e: React.MouseEvent) => void;
}

export function MarkdownButton({ icon: Icon, title, onClick }: MarkdownButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      title={title}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}