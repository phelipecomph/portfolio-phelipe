import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface PostFormProps {
  post?: any;
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
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">{t("admin.titleEn")}</label>
          <Input
            name="title_en"
            defaultValue={post?.title?.en || ""}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("admin.titlePt")}</label>
          <Input
            name="title_pt"
            defaultValue={post?.title?.pt || ""}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">{t("admin.contentEn")}</label>
          <Textarea
            name="content_en"
            defaultValue={post?.content?.en || ""}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("admin.contentPt")}</label>
          <Textarea
            name="content_pt"
            defaultValue={post?.content?.pt || ""}
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          name="published"
          defaultChecked={post?.published || false}
        />
        <label className="text-sm font-medium">{t("admin.published")}</label>
      </div>

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