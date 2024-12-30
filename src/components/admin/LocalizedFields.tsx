import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface LocalizedFieldsProps {
  nameEn: string;
  namePt: string;
  labelEn: string;
  labelPt: string;
  defaultValueEn?: string;
  defaultValuePt?: string;
  type?: "input" | "textarea";
  textareaHeight?: string;
  required?: boolean;
}

export function LocalizedFields({
  nameEn,
  namePt,
  labelEn,
  labelPt,
  defaultValueEn = "",
  defaultValuePt = "",
  type = "input",
  textareaHeight = "h-40",
  required = true,
}: LocalizedFieldsProps) {
  const { t } = useTranslation();

  const Field = type === "input" ? Input : Textarea;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">English Content</h3>
        <div>
          <label className="text-sm font-medium">{t(labelEn)}</label>
          <Field
            name={nameEn}
            defaultValue={defaultValueEn}
            required={required}
            className={`mt-1 ${type === "textarea" ? textareaHeight : ""}`}
          />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Portuguese Content</h3>
        <div>
          <label className="text-sm font-medium">{t(labelPt)}</label>
          <Field
            name={namePt}
            defaultValue={defaultValuePt}
            required={required}
            className={`mt-1 ${type === "textarea" ? textareaHeight : ""}`}
          />
        </div>
      </Card>
    </div>
  );
}