import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/content";

interface ProjectFormActionsProps {
  project?: Project;
  onCancel: () => void;
}

export function ProjectFormActions({ project, onCancel }: ProjectFormActionsProps) {
  const { t } = useTranslation();

  return (
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
  );
}