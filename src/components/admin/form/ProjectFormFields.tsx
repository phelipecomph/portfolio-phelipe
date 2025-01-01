import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { MarkdownToolbar } from "../MarkdownToolbar";
import type { Project } from "@/types/content";

interface ProjectFormFieldsProps {
  project?: Project;
  currentLanguage: "en" | "pt";
  titleRef: React.RefObject<HTMLInputElement>;
  descriptionRef: React.RefObject<HTMLInputElement>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
  onInputChange: (field: "title" | "description" | "content", value: string) => void;
}

export function ProjectFormFields({
  currentLanguage,
  titleRef,
  descriptionRef,
  contentRef,
  onInputChange,
}: ProjectFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex-1">
        <Input
          ref={titleRef}
          name={`title_${currentLanguage}`}
          onChange={(e) => onInputChange("title", e.target.value)}
          required
          placeholder={t(`admin.title${currentLanguage === "en" ? "En" : "Pt"}`)}
          className="text-xl font-bold"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2 min-h-[500px]">
        <Input
          ref={descriptionRef}
          name={`description_${currentLanguage}`}
          onChange={(e) => onInputChange("description", e.target.value)}
          required
          placeholder={t(`admin.description${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
        <MarkdownToolbar textareaRef={contentRef} />
        <textarea
          ref={contentRef}
          name={`content_${currentLanguage}`}
          onChange={(e) => onInputChange("content", e.target.value)}
          required
          className="flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[400px]"
          placeholder={t(`admin.content${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
      </div>
    </>
  );
}