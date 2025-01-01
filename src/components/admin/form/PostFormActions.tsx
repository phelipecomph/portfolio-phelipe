import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/types/content";

interface PostFormActionsProps {
  post?: BlogPost;
  onCancel: () => void;
}

export function PostFormActions({ post, onCancel }: PostFormActionsProps) {
  const { t } = useTranslation();

  return (
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
  );
}