import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProjectFormProps {
  project?: any;
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">English Content</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t("admin.titleEn")}</label>
              <Input
                name="title_en"
                defaultValue={project?.title?.en || ""}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t("admin.descriptionEn")}</label>
              <Textarea
                name="description_en"
                defaultValue={project?.description?.en || ""}
                required
                className="mt-1 h-40"
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Portuguese Content</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t("admin.titlePt")}</label>
              <Input
                name="title_pt"
                defaultValue={project?.title?.pt || ""}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t("admin.descriptionPt")}</label>
              <Textarea
                name="description_pt"
                defaultValue={project?.description?.pt || ""}
                required
                className="mt-1 h-40"
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t("admin.imageUrl")}</label>
            <Input
              name="image"
              defaultValue={project?.image || ""}
              required
              className="mt-1"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              name="featured"
              defaultChecked={project?.featured || false}
            />
            <label className="text-sm font-medium">{t("admin.featured")}</label>
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