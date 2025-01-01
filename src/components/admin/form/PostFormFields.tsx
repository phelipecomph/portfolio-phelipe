import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { MarkdownToolbar } from "../MarkdownToolbar";
import type { BlogPost } from "@/types/content";

interface PostFormFieldsProps {
  post?: BlogPost;
  currentLanguage: "en" | "pt";
  contentRef: React.RefObject<HTMLTextAreaElement>;
}

export function PostFormFields({
  currentLanguage,
  contentRef,
}: PostFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col gap-2 min-h-[500px]">
      <Input
        name={`title_${currentLanguage}`}
        required
        placeholder={t(`admin.title${currentLanguage === "en" ? "En" : "Pt"}`)}
        className="text-xl font-bold"
      />
      <Input
        name={`description_${currentLanguage}`}
        required
        placeholder={t(`admin.description${currentLanguage === "en" ? "En" : "Pt"}`)}
      />
      <MarkdownToolbar textareaRef={contentRef} />
      <textarea
        ref={contentRef}
        name={`content_${currentLanguage}`}
        required
        className="flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[400px]"
        placeholder={t(`admin.content${currentLanguage === "en" ? "En" : "Pt"}`)}
      />
    </div>
  );
}