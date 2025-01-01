import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { PostFormFields } from "./form/PostFormFields";
import { PostFormActions } from "./form/PostFormActions";
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      className="h-full flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <PostFormFields
          post={post}
          currentLanguage={currentLanguage}
          contentRef={contentRef}
        />
        <LanguageToggleButton
          currentLanguage={currentLanguage}
          onToggle={() => setCurrentLanguage(prev => prev === "en" ? "pt" : "en")}
        />
      </div>

      <PostFormActions post={post} onCancel={onCancel} />

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