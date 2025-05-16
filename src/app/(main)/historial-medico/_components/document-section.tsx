"use client";

import { useState } from "react";

import { Checkbox } from "@/components/kit/checkbox";

import DocumentCard from "./document-card";
import DocumentRow from "./document-row";

import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

interface DocumentSectionProps {
  viewMode: "grid" | "list";
  docs: MedicalHistoryWithTags[];
  onView: (doc: MedicalHistoryWithTags) => void;
  onAIClick: (doc: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onEdit: (doc: MedicalHistoryWithTags) => void;
  onDelete: (doc: MedicalHistoryWithTags) => void;
  onOpenOptions: (doc: MedicalHistoryWithTags | null) => void;
  currentDoc: MedicalHistoryWithTags | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DocumentSection = ({
  viewMode,
  docs,
  onView,
  onAIClick,
  onViewFile,
  onDownload,
  onEdit,
  onDelete,
  currentDoc,
  onOpenOptions,
  open,
  setOpen,
}: DocumentSectionProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === docs.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(docs.map((file) => file.id));
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="grid gap-3 @xl/list:grid-cols-2 @5xl/list:grid-cols-3">
        {docs.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onAIClick={onAIClick}
            onViewFile={onViewFile}
            onDownload={onDownload}
            currentDoc={currentDoc}
            onOpenOptions={onOpenOptions}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-muted overflow-hidden rounded-2xl">
      <div className="text-muted-foreground grid grid-cols-20 gap-4 px-4 py-3 text-xs font-medium">
        <div className="col-span-1 flex items-center">
          <Checkbox
            checked={selectedItems.length === docs.length && docs.length > 0}
            onCheckedChange={toggleSelectAll}
            className="rounded-md"
          />
        </div>
        <div className="col-span-8">Nombre</div>
        <div className="col-span-2">Tamaño</div>
        <div className="col-span-3">Fecha</div>
        <div className="col-span-4">Doctor</div>
        <div className="col-span-2 text-right">Acciones</div>
      </div>
      <div>
        {docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            doc={doc}
            onView={onView}
            onAIClick={onAIClick}
            onViewFile={onViewFile}
            onDownload={onDownload}
            onEdit={onEdit}
            onDelete={onDelete}
            selected={selectedItems.includes(doc.id)}
            onToggleSelect={() => toggleSelectItem(doc.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentSection;
