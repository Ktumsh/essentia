"use client";

import { useState } from "react";

import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

import DocumentCard from "../../_components/document-card";

interface MedicalFolderCardListProps {
  documents: MedicalHistoryWithTags[];
}
const MedicalFolderCardList = ({ documents }: MedicalFolderCardListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MedicalHistoryWithTags | null>(
    null,
  );

  if (documents.length === 0) {
    return (
      <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-center">
        No hay documentos en esta carpeta.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((item) => (
        <DocumentCard
          key={item.id}
          doc={item}
          onView={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onAIClick={() => {}}
          onViewFile={() => {}}
          onDownload={() => {}}
          onOpenOptions={setCurrentItem}
          currentDoc={currentItem}
          open={isOpen}
          setOpen={setIsOpen}
        />
      ))}
    </div>
  );
};

export default MedicalFolderCardList;
