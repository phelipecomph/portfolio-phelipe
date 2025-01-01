import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
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
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "pt">(i18n.language as "en" | "pt");
  const [formData, setFormData] = useState({
    title: {
      en: project?.title?.en || "",
      pt: project?.title?.pt || ""
    },
    description: {
      en: project?.description?.en || "",
      pt: project?.description?.pt || ""
    },
    content: {
      en: project?.description?.en || "",
      pt: project?.description?.pt || ""
    }
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Update form data when inputs change
  const handleInputChange = (field: "title" | "description" | "content", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [currentLanguage]: value
      }
    }));
  };

  // Update refs when language changes
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = formData.title[currentLanguage];
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = formData.description[currentLanguage];
    }
    if (contentRef.current) {
      contentRef.current.value = formData.content[currentLanguage];
    }
  }, [currentLanguage, formData]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "pt" : "en";
    setCurrentLanguage(newLang);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    
    // Add both language versions to the form data
    formDataObj.set("title_en", formData.title.en);
    formDataObj.set("title_pt", formData.title.pt);
    formDataObj.set("description_en", formData.description.en);
    formDataObj.set("description_pt", formData.description.pt);
    formDataObj.set("content_en", formData.content.en);
    formDataObj.set("content_pt", formData.content.pt);
    
    onSubmit(formDataObj);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Input
            ref={titleRef}
            name={`title_${currentLanguage}`}
            defaultValue={formData.title[currentLanguage]}
            onChange={(e) => handleInputChange("title", e.target.value)}
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
          ref={descriptionRef}
          name={`description_${currentLanguage}`}
          defaultValue={formData.description[currentLanguage]}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          placeholder={t(`admin.description${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
        <MarkdownToolbar textareaRef={contentRef} />
        <textarea
          ref={contentRef}
          name={`content_${currentLanguage}`}
          defaultValue={formData.content[currentLanguage]}
          onChange={(e) => handleInputChange("content", e.target.value)}
          required
          className="flex-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[400px]"
          placeholder={t(`admin.content${currentLanguage === "en" ? "En" : "Pt"}`)}
        />
      </div>

      <div className="flex items-center justify-between border-t pt-4 mt-auto">
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