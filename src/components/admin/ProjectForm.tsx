import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocalizedFields } from "./LocalizedFields";
import { MarkdownToolbar } from "./MarkdownToolbar";
import type { Project } from "@/types/content";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const { t } = useTranslation();
  const descriptionEnRef = useRef<HTMLTextAreaElement>(null);
  const descriptionPtRef = useRef<HTMLTextAreaElement>(null);

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

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("admin.descriptionEn")}</label>
          <MarkdownToolbar textareaRef={descriptionEnRef} />
          <textarea
            ref={descriptionEnRef}
            name="description_en"
            defaultValue={project?.description?.en}
            required
            className="min-h-[40vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-sm font-medium">{t("admin.descriptionPt")}</label>
          <MarkdownToolbar textareaRef={descriptionPtRef} />
          <textarea
            ref={descriptionPtRef}
            name="description_pt"
            defaultValue={project?.description?.pt}
            required
            className="min-h-[40vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

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