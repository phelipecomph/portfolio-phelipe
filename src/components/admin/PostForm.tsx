import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { MarkdownToolbar } from "./MarkdownToolbar";
import type { BlogPost } from "@/types/content";

interface PostFormProps {
  post?: BlogPost;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function PostForm({ post, onSubmit, onCancel }: PostFormProps) {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "pt">("en");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === "en" ? "pt" : "en");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      className="h-full flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Input
            name={`title_${currentLanguage}`}
            defaultValue={post?.title?.[currentLanguage]}
            required
            placeholder={t(`admin.title${currentLanguage === "en" ? "En" : "Pt"}`)}
            className="text-xl font-bold"
          />
        </div>
        <LanguageToggleButton
          currentLanguage={currentLanguage}
          onToggle={toggleLanguage}
        />
      </div>

      <div className="flex-1 flex flex-col gap-2 min-h-[500px]">
        <Input
          name={`description_${currentLanguage}`}
          defaultValue={post?.description?.[currentLanguage]}
          required
          placeholder={t(`admin.description${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
        <MarkdownToolbar textareaRef={contentRef} />
        <textarea
          ref={contentRef}
          name={`content_${currentLanguage}`}
          defaultValue={post?.content?.[currentLanguage]}
          required
          className="flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[400px]"
          placeholder={t(`admin.content${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
      </div>

      <div className="flex items-center justify-between border-t pt-4 mt-auto">
        <div className="flex items-center gap-2">
          <Switch
            name="published"
            defaultChecked={post?.published || false}
          />
          <label className="text-sm font-medium">{t("admin.published")}</label>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            {t("admin.cancel")}
          </Button>
          <Button type="submit">{t("admin.save")}</Button>
        </div>
      </div>

      {/* Hidden inputs for the other language */}
      <input
        type="hidden"
        name={`title_${currentLanguage === "en" ? "pt" : "en"}`}
        defaultValue={post?.title?.[currentLanguage === "en" ? "pt" : "en"]}
      />
      <input
        type="hidden"
        name={`description_${currentLanguage === "en" ? "pt" : "en"}`}
        defaultValue={post?.description?.[currentLanguage === "en" ? "pt" : "en"]}
      />
      <textarea
        className="hidden"
        name={`content_${currentLanguage === "en" ? "pt" : "en"}`}
        defaultValue={post?.content?.[currentLanguage === "en" ? "pt" : "en"]}
      />
    </form>
  );
}