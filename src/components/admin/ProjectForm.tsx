import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { ProjectFormFields } from "./form/ProjectFormFields";
import { ProjectFormActions } from "./form/ProjectFormActions";
import type { Project } from "@/types/content";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "pt">("en");
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
      en: project?.content?.en || "",
      pt: project?.content?.pt || ""
    }
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (field: "title" | "description" | "content", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [currentLanguage]: value
      }
    }));
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    
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
        <ProjectFormFields
          project={project}
          currentLanguage={currentLanguage}
          titleRef={titleRef}
          descriptionRef={descriptionRef}
          contentRef={contentRef}
          onInputChange={handleInputChange}
        />
        <LanguageToggleButton
          currentLanguage={currentLanguage}
          onToggle={() => setCurrentLanguage(prev => prev === "en" ? "pt" : "en")}
        />
      </div>

      <ProjectFormActions project={project} onCancel={onCancel} />

      <Input
        type="text"
        name="image"
        defaultValue={project?.image}
        required
        placeholder="Image URL"
        className="mt-4"
      />
    </form>
  );
}