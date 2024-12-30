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

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md mb-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("**", "**")}
        title="Negrito"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("*", "*")}
        title="Itálico"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("[", "](url)")}
        title="Link"
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("![alt text](", ")")}
        title="Imagem"
      >
        <Image className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("- ")}
        title="Lista"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("# ")}
        title="Título 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("## ")}
        title="Título 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("### ")}
        title="Título 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => insertText("```\n", "\n```")}
        title="Bloco de Código"
      >
        <Code className="h-4 w-4" />
      </Button>
    </div>
  );
}