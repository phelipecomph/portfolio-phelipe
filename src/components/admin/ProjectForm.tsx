import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { MarkdownToolbar } from "./MarkdownToolbar";
import type { Project } from "@/types/content";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "pt">("en");
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === "en" ? "pt" : "en");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      className="h-[calc(100vh-8rem)] flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Input
            name={`title_${currentLanguage}`}
            defaultValue={project?.title?.[currentLanguage]}
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

      <div className="flex-1 flex flex-col gap-2">
        <Input
          name={`description_${currentLanguage}`}
          defaultValue={project?.description?.[currentLanguage]}
          required
          placeholder={t(`admin.description${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
        <MarkdownToolbar textareaRef={descriptionRef} />
        <textarea
          ref={descriptionRef}
          name={`description_${currentLanguage}`}
          defaultValue={project?.description?.[currentLanguage]}
          required
          className="flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={t(`admin.description${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Switch
              name="featured"
              defaultChecked={project?.featured || false}
            />
            <label className="text-sm font-medium">{t("admin.featured")}</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              name="published"
              defaultChecked={project?.published || false}
            />
            <label className="text-sm font-medium">{t("admin.published")}</label>
          </div>
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
        defaultValue={project?.title?.[currentLanguage === "en" ? "pt" : "en"]}
      />
      <input
        type="hidden"
        name={`description_${currentLanguage === "en" ? "pt" : "en"}`}
        defaultValue={project?.description?.[currentLanguage === "en" ? "pt" : "en"]}
      />

      <Input
        type="text"
        name="image"
        defaultValue={project?.image}
        required
        placeholder={t("admin.imageUrl")}
        className="mt-4"
      />
    </form>
  );
}