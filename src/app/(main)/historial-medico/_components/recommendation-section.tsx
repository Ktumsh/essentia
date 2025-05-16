"use client";

import { useState } from "react";

import { Checkbox } from "@/components/kit/checkbox";
import { Dialog, DialogContent } from "@/components/kit/dialog";
import { Drawer, DrawerContent } from "@/components/kit/drawer";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import { useIsMobile } from "@/hooks/use-mobile";

import { AIRecommendationDetail } from "./ai-recommendation-detail";
import RecommendationCard from "./recommendation-card";
import RecommendationRow from "./recommendation-row";
import SavedDeleteConfirmationDialog from "./saved-delete-confirmation-dialog";

import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

interface RecommendationSectionProps {
  viewMode: "grid" | "list";
  medicalHistory: MedicalHistoryWithTags[];
  recommendations: SavedAIRecommendation[];
  onDeleteRecommendation: (id: string) => void;
  onUpdateRecommendation: (recommendation: SavedAIRecommendation) => void;
  onShareRecommendation: (recommendation: SavedAIRecommendation) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
}

const RecommendationSection = ({
  viewMode,
  medicalHistory,
  recommendations,
  onDeleteRecommendation,
  onUpdateRecommendation,
  onShareRecommendation,
  onViewFile,
}: RecommendationSectionProps) => {
  const isMobile = useIsMobile();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<SavedAIRecommendation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recommendationToDelete, setRecommendationToDelete] =
    useState<SavedAIRecommendation | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === recommendations.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(recommendations.map((file) => file.id));
    }
  };

  const openDetailDialog = (recommendation: SavedAIRecommendation) => {
    setSelectedRecommendation(recommendation);
    setEditNotes(recommendation.notes || "");
    setIsDetailDialogOpen(true);
  };

  // Función para confirmar la eliminación
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
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <SavedDeleteConfirmationDialog
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
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onShareRecommendation={onShareRecommendation}
              onDeleteRecommendation={confirmDelete}
              openDetailDialog={openDetailDialog}
            />
          ))}
        </div>
        {dialogs}
      </>
    );
  }

  return (
    <>
      <div className="bg-muted overflow-hidden rounded-2xl">
        <div className="text-muted-foreground grid grid-cols-20 gap-4 px-4 py-3 text-xs font-medium">
          <div className="col-span-1 flex items-center">
            <Checkbox
              checked={
                selectedItems.length === recommendations.length &&
                recommendations.length > 0
              }
              onCheckedChange={toggleSelectAll}
              className="rounded-md"
            />
          </div>
          <div className="col-span-8">Nombre</div>
          <div className="col-span-2">Prioridad</div>
          <div className="col-span-3">Fecha</div>
          <div className="col-span-4">Etiquetas</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>
        <div>
          {recommendations.map((doc) => (
            <RecommendationRow
              key={doc.id}
              recom={doc}
              onDeleteRecommendation={confirmDelete}
              onShareRecommendation={onShareRecommendation}
              openDetailDialog={openDetailDialog}
              selected={selectedItems.includes(doc.id)}
              onToggleSelect={() => toggleSelectItem(doc.id)}
            />
          ))}
        </div>
      </div>
      {dialogs}
    </>
  );
};

export default RecommendationSection;
