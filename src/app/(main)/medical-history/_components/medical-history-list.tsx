import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/kit/select";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

import EmptyState from "./empty-state";
import MedicalHistoryCard from "./medical-history-card";
import MedicalHistoryLoading from "./medical-history-loading";

interface MedicalHistoryListProps {
  filteredHistory: MedicalHistoryWithTags[];
  documentTypeFilter: "all" | "recent" | "shared" | "private";
  setDocumentTypeFilter: (
    value: "all" | "recent" | "shared" | "private",
  ) => void;
  onView: (item: MedicalHistoryWithTags) => void;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onAddDocument: () => void;
  onOpenOptions: (item: MedicalHistoryWithTags) => void;
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

  const docs = getFilteredByVisibility();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <h3 className="font-merriweather text-lg font-semibold">
          Documentos médicos
        </h3>
        <Select
          value={documentTypeFilter}
          onValueChange={(value) => setDocumentTypeFilter(value as any)}
        >
          <SelectTrigger className="rounded-full md:w-64">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los documentos</SelectItem>
            <SelectItem value="recent">Documentos recientes</SelectItem>
            <SelectItem value="shared">Documentos compartidos</SelectItem>
            <SelectItem value="private">Documentos privados</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="@container/list mt-4">
        {isHistoryLoading ? (
          <MedicalHistoryLoading />
        ) : docs.length === 0 ? (
          <EmptyState
            hasFilters={documentTypeFilter !== "all"}
            onClearFilters={clearFilters}
            onAddDocument={onAddDocument}
          />
        ) : (
          <div className="grid gap-3 @xl/list:grid-cols-2 @5xl/list:grid-cols-3">
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryList;
