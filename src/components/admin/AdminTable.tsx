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
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface AdminTableProps {
  items: any[];
  type: "projects" | "posts";
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onReorder: (items: any[]) => void;
}

function SortableTableRow({ item, type, onEdit, onDelete, t, i18n }: any) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="cursor-grab active:cursor-grabbing"
            {...attributes} 
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          {item.title[i18n.language as "en" | "pt"]}
        </div>
      </TableCell>
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
  );
}

export function AdminTable({ items, type, onEdit, onDelete, onReorder }: AdminTableProps) {
  const { t, i18n } = useTranslation();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newItems = [...items];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      
      // Update display_order for all items
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        display_order: index + 1,
      }));
      
      onReorder(updatedItems);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title ({i18n.language.toUpperCase()})</TableHead>
            <TableHead>{type === "projects" ? "Featured" : "Published"}</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableTableRow
                key={item.id}
                item={item}
                type={type}
                onEdit={onEdit}
                onDelete={onDelete}
                t={t}
                i18n={i18n}
              />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}