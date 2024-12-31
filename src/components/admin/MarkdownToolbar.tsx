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
import { MarkdownButton } from "./MarkdownButton";

interface MarkdownToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

interface ToolbarButton {
  icon: any;
  title: string;
  before: string;
  after?: string;
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
    e.preventDefault();
    insertText(before, after);
  };

  const toolbarButtons: ToolbarButton[] = [
    { icon: Bold, title: "Negrito", before: "**", after: "**" },
    { icon: Italic, title: "Itálico", before: "*", after: "*" },
    { icon: Link, title: "Link", before: "[", after: "](url)" },
    { icon: Image, title: "Imagem", before: "![alt text](", after: ")" },
    { icon: List, title: "Lista", before: "- " },
    { icon: Heading1, title: "Título 1", before: "# " },
    { icon: Heading2, title: "Título 2", before: "## " },
    { icon: Heading3, title: "Título 3", before: "### " },
    { icon: Code, title: "Bloco de Código", before: "```\n", after: "\n```" },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md mb-2">
      {toolbarButtons.map((button, index) => (
        <MarkdownButton
          key={index}
          icon={button.icon}
          title={button.title}
          onClick={(e) => handleButtonClick(e, button.before, button.after)}
        />
      ))}
    </div>
  );
}