import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocalizedFields } from "./LocalizedFields";
import type { BlogPost } from "@/types/content";

interface PostFormProps {
  post?: BlogPost;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function PostForm({ post, onSubmit, onCancel }: PostFormProps) {
  const { t } = useTranslation();

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

      <LocalizedFields
        nameEn="content_en"
        namePt="content_pt"
        labelEn="admin.contentEn"
        labelPt="admin.contentPt"
        defaultValueEn={post?.content?.en}
        defaultValuePt={post?.content?.pt}
        type="textarea"
        textareaHeight="h-60"
      />

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