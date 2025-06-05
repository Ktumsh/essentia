"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import { useIsMobile } from "@/hooks/use-mobile";

import { AIRecommendationDetail } from "./ai-recommendation-detail";
import RecommendationCard from "./recommendation-card";
import RecommendationDeleteAlert from "./recommendation-delete-alert";
import RecommendationRow from "./recommendation-row";

import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

interface RecommendationSectionProps {
  viewMode: "grid" | "list";
  medicalHistory: MedicalHistoryWithTags[];
  recommendations: SavedAIRecommendation[];
  onDeleteRecommendation: (id: string) => void;
  onUpdateRecommendation: (recommendation: SavedAIRecommendation) => void;
  onShareRecommendation: (recommendation: SavedAIRecommendation) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRecom: string[];
  onClickSelect: (e: React.MouseEvent, id: string, index: number) => void;
  onCheckboxToggle: (id: string, index: number) => void;
  onToggleSelectAll: () => void;
  onPointerDown: (id: string, index: number, e: React.PointerEvent) => void;
  onPointerUp: (id: string, index: number) => void;
}

const RecommendationSection = ({
  viewMode,
  medicalHistory,
  recommendations,
  onDeleteRecommendation,
  onUpdateRecommendation,
  onShareRecommendation,
  onViewFile,
  open,
  setOpen,
  selectedRecom,
  onClickSelect,
  onCheckboxToggle,
  onToggleSelectAll,
  onPointerDown,
  onPointerUp,
}: RecommendationSectionProps) => {
  const isMobile = useIsMobile();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<SavedAIRecommendation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recommendationToDelete, setRecommendationToDelete] =
    useState<SavedAIRecommendation | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const openDetailDialog = (recommendation: SavedAIRecommendation) => {
    setSelectedRecommendation(recommendation);
    setEditNotes(recommendation.notes || "");
    setIsDetailDialogOpen(true);
  };

  const confirmDelete = (recommendation: SavedAIRecommendation) => {
    setRecommendationToDelete(recommendation);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (recommendationToDelete) {
      onDeleteRecommendation(recommendationToDelete.id);
      setIsDeleteDialogOpen(false);
      setRecommendationToDelete(null);

      if (
        selectedRecommendation &&
        selectedRecommendation.id === recommendationToDelete.id
      ) {
        setIsDetailDialogOpen(false);
        setSelectedRecommendation(null);
      }
    }
  };

  const saveNotes = () => {
    if (selectedRecommendation) {
      const updatedRecommendation = {
        ...selectedRecommendation,
        notes: editNotes,
      };
      onUpdateRecommendation(updatedRecommendation);
      setSelectedRecommendation(updatedRecommendation);
    }
  };

  const dialogs = (
    <>
      {isMobile ? (
        <Drawer open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DrawerContent>
            {selectedRecommendation && (
              <AIRecommendationDetail
                recommendation={selectedRecommendation}
                medicalHistory={medicalHistory}
                onSaveNotes={saveNotes}
                isFromSavedRecommendations
                onViewFile={onViewFile}
                editNotes={editNotes}
                setEditNotes={setEditNotes}
              />
            )}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent isSecondary className="sm:max-w-xl">
            <button className="sr-only" />
            {selectedRecommendation && (
              <AIRecommendationDetail
                recommendation={selectedRecommendation}
                medicalHistory={medicalHistory}
                onSaveNotes={saveNotes}
                isFromSavedRecommendations
                onViewFile={onViewFile}
                editNotes={editNotes}
                setEditNotes={setEditNotes}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <RecommendationDeleteAlert
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        recommendationToDelete={recommendationToDelete}
        onDelete={handleDelete}
      />
    </>
  );

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid gap-3 @xl/list:grid-cols-2 @5xl/list:grid-cols-3">
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              currentRec={selectedRecommendation}
              onShareRecommendation={onShareRecommendation}
              onDeleteRecommendation={confirmDelete}
              openDetailDialog={openDetailDialog}
              open={open}
              setOpen={setOpen}
              selected={selectedRecom.includes(rec.id)}
              onToggleSelect={(e) => onClickSelect(e, rec.id, index)}
              onPointerDown={(e) => onPointerDown(rec.id, index, e)}
              onPointerUp={() => onPointerUp(rec.id, index)}
            />
          ))}
        </div>
        {dialogs}
      </>
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
                    selectedRecom.length === recommendations.length &&
                    recommendations.length > 0
                  }
                  onCheckedChange={onToggleSelectAll}
                  className="border-alternative shadow-none"
                />
              </div>
            </th>
            <th className="px-4 py-3 text-left font-medium">Nombre</th>
            <th className="px-4 py-3 text-left font-medium">Prioridad</th>
            <th className="px-4 py-3 text-left font-medium">Añadido el</th>
            <th className="px-4 py-3 text-left font-medium">Etiquetas</th>
            <th className="px-4 py-3 text-right font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec, index) => (
            <RecommendationRow
              key={rec.id}
              recom={rec}
              onDeleteRecommendation={confirmDelete}
              onShareRecommendation={onShareRecommendation}
              openDetailDialog={openDetailDialog}
              selected={selectedRecom.includes(rec.id)}
              onToggleSelect={() => onCheckboxToggle(rec.id, index)}
            />
          ))}
        </tbody>
      </table>
      {dialogs}
    </div>
  );
};

export default RecommendationSection;
