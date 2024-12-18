import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface AdminTableProps {
  items: any[];
  type: "projects" | "posts";
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export function AdminTable({ items, type, onEdit, onDelete }: AdminTableProps) {
  const { t, i18n } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title ({i18n.language.toUpperCase()})</TableHead>
          <TableHead>{type === "projects" ? "Featured" : "Published"}</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title[i18n.language as "en" | "pt"]}</TableCell>
            <TableCell>
              {type === "projects"
                ? item.featured ? "Yes" : "No"
                : item.published ? "Yes" : "No"}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  {t("admin.edit")}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(item.id)}
                >
                  {t("admin.delete")}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}