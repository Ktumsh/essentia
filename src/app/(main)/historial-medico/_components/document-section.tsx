"use client";

import { Checkbox } from "@/components/ui/checkbox";

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
  selectedDocs: string[];
  onClickSelect: (e: React.MouseEvent, id: string, index: number) => void;
  onCheckboxToggle: (id: string, index: number) => void;
  onToggleSelectAll: () => void;
  onPointerDown: (id: string, index: number, e: React.PointerEvent) => void;
  onPointerUp: (id: string, index: number) => void;
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
  selectedDocs,
  onClickSelect,
  onCheckboxToggle,
  onToggleSelectAll,
  onPointerDown,
  onPointerUp,
}: DocumentSectionProps) => {
  if (viewMode === "grid") {
    return (
      <div className="grid gap-3 @xl/list:grid-cols-2 @5xl/list:grid-cols-3">
        {docs.map((doc, index) => (
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
            selected={selectedDocs.includes(doc.id)}
            onToggleSelect={(e) => onClickSelect(e, doc.id, index)}
            onPointerDown={(e) => onPointerDown(doc.id, index, e)}
            onPointerUp={() => onPointerUp(doc.id, index)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-muted relative w-full overflow-auto rounded-xl">
      <table className="text-muted-foreground w-full min-w-3xl text-xs">
        <thead>
          <tr className="text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium">
              <div className="flex items-center">
                <Checkbox
                  checked={
                    selectedDocs?.length === docs.length && docs.length > 0
                  }
                  onCheckedChange={onToggleSelectAll}
                  className="border-alternative shadow-none"
                />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-medium">Nombre</th>
            <th className="px-4 py-3 text-left font-medium">Tamaño</th>
            <th className="px-4 py-3 text-left font-medium">Añadido el</th>
            <th className="px-4 py-3 text-left font-medium">Doctor</th>
            <th className="px-4 py-3 text-right font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index) => (
            <DocumentRow
              key={doc.id}
              doc={doc}
              onView={onView}
              onAIClick={onAIClick}
              onViewFile={onViewFile}
              onDownload={onDownload}
              onEdit={onEdit}
              onDelete={onDelete}
              selected={selectedDocs.includes(doc.id)}
              onToggleSelect={() => onCheckboxToggle(doc.id, index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentSection;
