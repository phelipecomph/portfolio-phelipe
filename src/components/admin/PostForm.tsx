import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocalizedFields } from "./LocalizedFields";
import { MarkdownToolbar } from "./MarkdownToolbar";
import type { BlogPost } from "@/types/content";

interface PostFormProps {
  post?: BlogPost;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function PostForm({ post, onSubmit, onCancel }: PostFormProps) {
  const { t } = useTranslation();
  const contentEnRef = useRef<HTMLTextAreaElement>(null);
  const contentPtRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      className="space-y-6"
    >
      <LocalizedFields
        nameEn="title_en"
        namePt="title_pt"
        labelEn="admin.titleEn"
        labelPt="admin.titlePt"
        defaultValueEn={post?.title?.en}
        defaultValuePt={post?.title?.pt}
      />

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("admin.contentEn")}</label>
          <MarkdownToolbar textareaRef={contentEnRef} />
          <textarea
            ref={contentEnRef}
            name="content_en"
            defaultValue={post?.content?.en}
            required
            className="min-h-[60vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-sm font-medium">{t("admin.contentPt")}</label>
          <MarkdownToolbar textareaRef={contentPtRef} />
          <textarea
            ref={contentPtRef}
            name="content_pt"
            defaultValue={post?.content?.pt}
            required
            className="min-h-[60vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Switch
            name="published"
            defaultChecked={post?.published || false}
          />
          <label className="text-sm font-medium">{t("admin.published")}</label>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {t("admin.cancel")}
        </Button>
        <Button type="submit">{t("admin.save")}</Button>
      </div>
    </form>
  );
}