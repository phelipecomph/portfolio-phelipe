import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocalizedFields } from "./LocalizedFields";
import type { Project } from "@/types/content";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
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
        defaultValueEn={project?.title?.en}
        defaultValuePt={project?.title?.pt}
      />

      <LocalizedFields
        nameEn="description_en"
        namePt="description_pt"
        labelEn="admin.descriptionEn"
        labelPt="admin.descriptionPt"
        defaultValueEn={project?.description?.en}
        defaultValuePt={project?.description?.pt}
        type="textarea"
      />

      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t("admin.imageUrl")}</label>
            <Input
              name="image"
              defaultValue={project?.image}
              required
              className="mt-1"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex flex-col gap-4">
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