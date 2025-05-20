"use client";

import { FileText } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/kit/card";
import useFolderName from "@/hooks/use-folder-name";
import { useIsMobile } from "@/hooks/use-mobile";

import FolderDocumentFilters from "./folder-documents-filter";
import FolderSectionHeader from "./folder-section-header";
import DocumentEmptyState from "../../_components/document-empty-state";
import DocumentSection from "../../_components/document-section";
import ViewModeToggle from "../../_components/view-mode-toggle";
import { useMedicalDialogs } from "../../_hooks/use-medical-dialogs";
import { useMedicalFoldersDialog } from "../../_hooks/use-medical-folder-dialogs";
import { useMedicalFolders } from "../../_hooks/use-medical-folders";
import { useMedicalHistoryLogic } from "../../_hooks/use-medical-history-logic";
import { useMultiSelect } from "../../_hooks/use-multi-select";
import { useViewMode } from "../../_hooks/use-view-mode";

import type {
  MedicalFileType,
  MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";

interface DocumentsViewProps {
  docs: MedicalHistoryWithTags[];
  folderId: string;
}
const DocumentsView = ({ docs, folderId }: DocumentsViewProps) => {
  const [folderSearchTerm, setFolderSearchTerm] = useState("");
  const [folderCategory, setFolderCategory] = useState<MedicalFileType | "all">(
    "all",
  );

  const { userId, isOpenOptions, setIsOpenOptions, handleDownload } =
    useMedicalHistoryLogic();

  const isMobile = useIsMobile();

  const {
    openDialog,
    setCurrentItem,
    editingItem,
    setEditingItem,
    setItemToDelete,
    setFileToView,
    setSelectedItemsForAI,
  } = useMedicalDialogs();

  const { openFolderForm } = useMedicalFoldersDialog();

  const { viewMode, setViewMode } = useViewMode();

  const { folderName } = useFolderName(folderId);

  const {
    selectedIds: selectedDocuments,
    handleSelect,
    handleToggle,
    clearSelection,
    containerRef,
    setSelectedIds,
  } = useMultiSelect(docs);

  const { handleDeleteDocumentsFromFolder } = useMedicalFolders();

  const filteredFolderDocs = docs.filter((doc) => {
    const matchesSearch = doc.condition
      .toLowerCase()
      .includes(folderSearchTerm.toLowerCase().trim());

    const matchesCategory =
      folderCategory === "all" || doc.type === folderCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <FolderSectionHeader
        count={selectedDocuments.length}
        onClear={clearSelection}
        onDelete={() => {
          handleDeleteDocumentsFromFolder({
            userId,
            folderId,
            documentIds: selectedDocuments,
          });
          clearSelection();
        }}
        onNewFolder={openFolderForm}
        folderName={folderName}
        variant="documents"
      />
      {docs.length > 0 && (
        <div className="mt relative mt-3 flex w-full overflow-x-auto rounded-xl">
          <div className="bg-muted flex flex-1 items-center justify-between gap-2 p-3">
            {isMobile && (
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            )}
            <FolderDocumentFilters
              searchTerm={folderSearchTerm}
              setSearchTerm={setFolderSearchTerm}
              category={folderCategory}
              setCategory={setFolderCategory}
            />
            {!isMobile && (
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            )}
          </div>
        </div>
      )}
      <div ref={containerRef} className="@container/list mt-3">
        {docs.length === 0 ? (
          <Card className="border border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
                <FileText className="text-muted-foreground size-12 opacity-50" />
                <div className="space-y-1.5 text-center">
                  <p className="text-foreground text-sm font-medium">
                    No hay documentos médicos en esta carpeta
                  </p>
                  <p className="text-xs md:text-sm">
                    Agrega documentos médicos a esta carpeta para mantener un
                    mejor control de tu historial médico.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : filteredFolderDocs.length === 0 ? (
          <DocumentEmptyState
            hasFilters={
              folderSearchTerm.trim() !== "" || folderCategory !== "all"
            }
            onClearFilters={() => {
              setFolderSearchTerm("");
              setFolderCategory("all");
            }}
            onAddDocument={() => openDialog("isAddDialogOpen")}
          />
        ) : (
          <DocumentSection
            docs={filteredFolderDocs}
            viewMode={viewMode}
            onView={(item) => {
              setCurrentItem(item);
              openDialog("isViewDialogOpen");
            }}
            onAIClick={(item) => {
              setSelectedItemsForAI([item.id]);
              openDialog("isAIDialogOpen");
            }}
            onViewFile={(file) => {
              setFileToView(file);
              openDialog("isFileViewerOpen");
            }}
            onDownload={handleDownload}
            onEdit={(item) => {
              setEditingItem(item);
              openDialog("isEditDialogOpen");
            }}
            onDelete={(item) => {
              setItemToDelete(item);
              openDialog("isDeleteDialogOpen");
            }}
            currentDoc={editingItem}
            open={isOpenOptions}
            setOpen={setIsOpenOptions}
            onOpenOptions={(item) => {
              setCurrentItem(item);
              setIsOpenOptions(true);
            }}
            selectedDocs={selectedDocuments}
            onSelect={(e, id, index) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey) {
                handleSelect(e, id, index);
              } else {
                handleToggle(id, index);
              }
            }}
            onToggleSelectAll={() => {
              if (selectedDocuments.length === filteredFolderDocs.length) {
                clearSelection();
              } else {
                setSelectedIds(filteredFolderDocs.map((doc) => doc.id));
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default DocumentsView;
