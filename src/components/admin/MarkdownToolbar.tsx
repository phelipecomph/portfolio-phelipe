import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Link,
  Image,
  List,
  Heading1,
  Heading2,
  Heading3,
  Code,
} from "lucide-react";

interface MarkdownToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export function MarkdownToolbar({ textareaRef }: MarkdownToolbarProps) {
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + 
      before + selectedText + after + 
      text.substring(end);
    
    textarea.value = newText;
    textarea.focus();
    textarea.selectionStart = start + before.length;
    textarea.selectionEnd = end + before.length;
  };

  const handleButtonClick = (e: React.MouseEvent, before: string, after?: string) => {
    e.preventDefault(); // Prevent form submission
    insertText(before, after);
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md mb-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "**", "**")}
        title="Negrito"
        type="button" // Explicitly set type to button
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "*", "*")}
        title="Itálico"
        type="button"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "[", "](url)")}
        title="Link"
        type="button"
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "![alt text](", ")")}
        title="Imagem"
        type="button"
      >
        <Image className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "- ")}
        title="Lista"
        type="button"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "# ")}
        title="Título 1"
        type="button"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "## ")}
        title="Título 2"
        type="button"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "### ")}
        title="Título 3"
        type="button"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => handleButtonClick(e, "```\n", "\n```")}
        title="Bloco de Código"
        type="button"
      >
        <Code className="h-4 w-4" />
      </Button>
    </div>
  );
}