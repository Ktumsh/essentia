"use client";

import {
  Lightbulb,
  BookmarkCheck,
  Search,
  FilterX,
  Sparkles,
  LockKeyhole,
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";

import { LockButton } from "@/components/button-kit/lock-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import { Card, CardContent } from "@/components/kit/card";
import { Dialog, DialogContent } from "@/components/kit/dialog";
import { Drawer, DrawerContent } from "@/components/kit/drawer";
import { Input } from "@/components/kit/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { BetterTooltip } from "@/components/kit/tooltip";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";

import { AIRecommendationDetail } from "./ai-recommendation-detail";
import SavedDeleteConfirmationDialog from "./saved-delete-confirmation-dialog";
import SavedRecommendationsCard from "./saved-recommendations-card";
import SavedRecommendationsLoading from "./saved-recommendations-loading";
import { useViewMode } from "../_hooks/use-view-mode";

interface SavedRecommendationsProps {
  medicalHistory: MedicalHistoryWithTags[];
  savedRecommendations: SavedAIRecommendation[];
  onDeleteRecommendation: (id: string) => void;
  onUpdateRecommendation: (recommendation: SavedAIRecommendation) => void;
  onShareRecommendation?: (recommendation: SavedAIRecommendation) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onOpenPremiumModal: () => void;
  isRecommendationLoading: boolean;
}

export default function SavedRecommendations({
  medicalHistory,
  savedRecommendations,
  onDeleteRecommendation,
  onUpdateRecommendation,
  onShareRecommendation,
  onViewFile,
  onOpenPremiumModal,
  isRecommendationLoading,
}: SavedRecommendationsProps) {
  const isMobile = useIsMobile();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<SavedAIRecommendation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recommendationToDelete, setRecommendationToDelete] =
    useState<SavedAIRecommendation | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const { user } = useUserProfile();

  const isPremium = user?.isPremium;

  const { getViewMode, setViewMode } = useViewMode();

  const viewMode = getViewMode("saved");

  // Filtrar recomendaciones según la búsqueda y la pestaña activa
  const filteredRecommendations = savedRecommendations.filter((rec) => {
    const matchesSearch =
      searchTerm === "" ||
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.relatedTags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      rec.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || rec.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  // Función para abrir el diálogo de detalles
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

  // Función para eliminar una recomendación
  const handleDelete = () => {
    if (recommendationToDelete) {
      onDeleteRecommendation(recommendationToDelete.id);
      setIsDeleteDialogOpen(false);
      setRecommendationToDelete(null);

      // Si el item que se está viendo es el que se eliminó, cerrar el diálogo de vista
      if (
        selectedRecommendation &&
        selectedRecommendation.id === recommendationToDelete.id
      ) {
        setIsDetailDialogOpen(false);
        setSelectedRecommendation(null);
      }
    }
  };

  // Función para guardar las notas editadas
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

  const clearFilters = () => {
    setSearchTerm("");
    setPriorityFilter("all");
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-100 to-indigo-300 dark:from-indigo-950 dark:to-indigo-800">
        <div className="p-3">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <h3 className="flex flex-col gap-2 text-base font-medium md:flex-row md:items-center">
              <div className="inline-flex items-center gap-2">
                <BookmarkCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                <span className="font-merriweather text-foreground text-lg font-semibold">
                  Recomendaciones guardadas
                </span>
              </div>
              <Badge className="h-5 border-0 bg-gradient-to-r from-indigo-500 to-indigo-600 px-1.5 py-0 text-indigo-50 **:fill-indigo-50">
                <Sparkles className="size-3!" />
                Funcionalidad premium
              </Badge>
            </h3>
            {isPremium ? (
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <div className="relative w-full sm:w-64">
                  <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                  <Input
                    placeholder="Buscar recomendaciones..."
                    className="bg-background h-9 rounded-full border-indigo-500 pl-8 text-sm shadow-none focus:border-indigo-500! focus-visible:ring-indigo-300 dark:focus:ring-indigo-700 dark:focus-visible:ring-indigo-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={priorityFilter}
                  onValueChange={(value) => setPriorityFilter(value as any)}
                >
                  <SelectTrigger className="bg-background h-9 w-full rounded-full border-indigo-500 shadow-none sm:w-48">
                    <SelectValue placeholder="Filtrar por prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las prioridades</SelectItem>
                    <SelectItem
                      value="high"
                      className="font-medium text-red-600 dark:text-red-500"
                    >
                      Prioridad alta
                    </SelectItem>
                    <SelectItem
                      value="medium"
                      className="font-medium text-amber-600 dark:text-amber-500"
                    >
                      Prioridad media
                    </SelectItem>
                    <SelectItem
                      value="low"
                      className="font-medium text-green-600 dark:text-green-500"
                    >
                      Prioridad baja
                    </SelectItem>
                  </SelectContent>
                </Select>
                {!isMobile && (
                  <div className="flex items-center space-x-1">
                    <BetterTooltip content="Vista en grilla">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setViewMode("saved", "grid")}
                        className={cn(
                          "size-7 rounded-sm",
                          viewMode === "grid" && "bg-background shadow-sm",
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
                        onClick={() => setViewMode("saved", "list")}
                        className={cn(
                          "size-7 rounded-sm",
                          viewMode === "list" && "bg-background shadow-sm",
                        )}
                        aria-label="Vista en lista"
                      >
                        <List className="size-3.5!" />
                      </Button>
                    </BetterTooltip>
                  </div>
                )}
                {(searchTerm || priorityFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFilters}
                    className="size-9"
                    title="Limpiar filtros"
                  >
                    <FilterX />
                  </Button>
                )}
              </div>
            ) : (
              <LockButton
                variant="gradient"
                onClick={onOpenPremiumModal}
                className="rounded-full"
              >
                Desbloquear Premium
              </LockButton>
            )}
          </div>
        </div>
      </div>

      <div className="@container/list mt-3">
        {!isPremium ? (
          <Card className="border border-indigo-200 dark:border-indigo-900">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <LockKeyhole className="mb-4 size-16 text-amber-400 opacity-50 dark:text-amber-300" />
              <h3 className="text-lg font-medium">
                Contenido Premium Bloqueado
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
                Suscríbete a Premium para acceder a todas tus recomendaciones
                guardadas y desbloquear funciones avanzadas.
              </p>
              <LockButton
                variant="gradient"
                onClick={onOpenPremiumModal}
                className="mt-4 rounded-full"
              >
                Desbloquear Premium
              </LockButton>
            </CardContent>
          </Card>
        ) : isRecommendationLoading ? (
          <SavedRecommendationsLoading
            viewMode={isMobile ? "grid" : viewMode}
          />
        ) : filteredRecommendations.length === 0 ? (
          <Card className="border">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Lightbulb className="mb-4 size-16 text-amber-400 opacity-50 dark:text-amber-300" />
              <h3 className="text-lg font-medium">
                No hay recomendaciones guardadas
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
                {searchTerm || priorityFilter !== "all"
                  ? "No se encontraron recomendaciones con los filtros aplicados."
                  : "Guarda recomendaciones de IA para acceder a ellas fácilmente en el futuro."}
              </p>
              {(searchTerm || priorityFilter !== "all") && (
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={clearFilters}
                >
                  Limpiar filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div
            className={cn(
              "grid gap-3 @xl/list:grid-cols-2 @5xl/list:grid-cols-3",
              viewMode === "list" &&
                "@xl/list:grid-cols-1 @5xl/list:grid-cols-1",
            )}
          >
            {filteredRecommendations.map((rec) => (
              <SavedRecommendationsCard
                key={rec.id}
                recommendation={rec}
                onShareRecommendation={onShareRecommendation}
                onDeleteRecommendation={confirmDelete}
                openDetailDialog={openDetailDialog}
                viewMode={isMobile ? "grid" : viewMode}
              />
            ))}
          </div>
        )}
      </div>
      {/* Diálogo de detalles de recomendación */}
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

      {/* Diálogo de confirmación para eliminar */}
      <SavedDeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        recommendationToDelete={recommendationToDelete}
        onDelete={handleDelete}
      />
    </div>
  );
}
