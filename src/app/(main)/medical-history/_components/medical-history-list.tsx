import { LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/kit/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/kit/select";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import EmptyState from "./empty-state";
import MedicalHistoryCard from "./medical-history-card";
import MedicalHistoryLoading from "./medical-history-loading";
import { useViewMode } from "../_hooks/use-view-mode";

import type {
  MedicalFileType,
  MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";

interface MedicalHistoryListProps {
  filteredHistory: MedicalHistoryWithTags[];
  documentTypeFilter: "all" | "recent" | "shared" | "private";
  setDocumentTypeFilter: (
    value: "all" | "recent" | "shared" | "private",
  ) => void;
  documentCategoryFilter: MedicalFileType | "all";
  setDocumentCategoryFilter: (value: MedicalFileType | "all") => void;
  onView: (item: MedicalHistoryWithTags) => void;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onAddDocument: () => void;
  onOpenOptions: (item: MedicalHistoryWithTags | null) => void;
  currentItem: MedicalHistoryWithTags | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  clearFilters: () => void;
  isHistoryLoading: boolean;
}

const MedicalHistoryList = ({
  filteredHistory,
  documentTypeFilter,
  setDocumentTypeFilter,
  documentCategoryFilter,
  setDocumentCategoryFilter,
  onView,
  onEdit,
  onDelete,
  onAIClick,
  onViewFile,
  onAddDocument,
  onOpenOptions,
  currentItem,
  isOpen,
  setIsOpen,
  clearFilters,
  isHistoryLoading,
}: MedicalHistoryListProps) => {
  const isMobile = useIsMobile();
  const { getViewMode, setViewMode } = useViewMode();

  const getFilteredByVisibility = () => {
    if (documentTypeFilter === "recent") {
      return filteredHistory
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);
    }
    if (documentTypeFilter === "shared" || documentTypeFilter === "private") {
      return filteredHistory.filter((i) => i.visibility === documentTypeFilter);
    }
    return filteredHistory;
  };

  const viewMode = getViewMode("medical");

  const docs = getFilteredByVisibility();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <h3 className="font-merriweather text-lg font-semibold">
          Documentos médicos
        </h3>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Select
            value={documentTypeFilter}
            onValueChange={(value) => setDocumentTypeFilter(value as any)}
          >
            <SelectTrigger className="rounded-full md:w-56">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los documentos</SelectItem>
              <SelectItem value="recent">Documentos recientes</SelectItem>
              <SelectItem value="shared">Documentos compartidos</SelectItem>
              <SelectItem value="private">Documentos privados</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={documentCategoryFilter}
            onValueChange={(value) => setDocumentCategoryFilter(value as any)}
          >
            <SelectTrigger className="rounded-full md:w-40">
              <SelectValue placeholder="Filtrar por tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="Examen">Examen</SelectItem>
              <SelectItem value="Receta">Receta</SelectItem>
              <SelectItem value="Informe">Informe</SelectItem>
              <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
              <SelectItem value="Imagenología">Imagenología</SelectItem>
              <SelectItem value="Certificado">Certificado</SelectItem>
              <SelectItem value="Epicrisis">Epicrisis</SelectItem>
              <SelectItem value="Consentimiento">Consentimiento</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {!isMobile && (
            <div className="flex items-center space-x-1 rounded-md border p-1">
              <BetterTooltip content="Vista en grilla">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setViewMode("medical", "grid")}
                  className={cn(
                    "size-7 rounded-sm",
                    viewMode === "grid" && "bg-accent",
                  )}
                  aria-label="Vista en grilla"
                >
                  <LayoutGrid className="size-3.5!" />
                </Button>
              </BetterTooltip>
              <BetterTooltip content="Vista en lista">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setViewMode("medical", "list")}
                  className={cn(
                    "size-7 rounded-sm",
                    viewMode === "list" && "bg-accent",
                  )}
                  aria-label="Vista en lista"
                >
                  <List className="size-3.5!" />
                </Button>
              </BetterTooltip>
            </div>
          )}
        </div>
      </div>
      <div className="@container/list mt-4">
        {isHistoryLoading ? (
          <MedicalHistoryLoading viewMode={isMobile ? "grid" : viewMode} />
        ) : docs.length === 0 ? (
          <EmptyState
            hasFilters={documentTypeFilter !== "all"}
            onClearFilters={clearFilters}
            onAddDocument={onAddDocument}
          />
        ) : (
          <div
            className={cn(
              "grid gap-3 @xl/list:grid-cols-2 @5xl/list:grid-cols-3",
              viewMode === "list" &&
                "@xl/list:grid-cols-1 @5xl/list:grid-cols-1",
            )}
          >
            {docs.map((item) => (
              <MedicalHistoryCard
                key={item.id}
                item={item}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onAIClick={onAIClick}
                onViewFile={onViewFile}
                currentItem={currentItem}
                onOpenOptions={onOpenOptions}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                viewMode={isMobile ? "grid" : viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryList;
