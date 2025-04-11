import { DeleteButton } from "@/components/button-kit/delete-button";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";

import { getPriorityText } from "../_lib/utils";

interface SavedDeleteConfirmationDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  recommendationToDelete: SavedAIRecommendation | null;
  onDelete: () => void;
}

const SavedDeleteConfirmationDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  recommendationToDelete,
  onDelete,
}: SavedDeleteConfirmationDialogProps) => {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary className="pb-6!">
          <BadgeAlert variant="warning" />
          <DialogTitle className="flex items-center gap-2">
            Confirmar eliminación
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              ¿Estás seguro de que deseas eliminar esta recomendación guardada?
              {recommendationToDelete && (
                <div className="dark:bg-accent/50 mt-2 rounded-md border bg-slate-50 p-3">
                  <p className="font-medium">{recommendationToDelete.title}</p>
                  <p className="text-muted-foreground text-sm">
                    Prioridad:{" "}
                    {getPriorityText(recommendationToDelete.priority)}
                  </p>
                </div>
              )}
              <p className="mt-2 text-sm text-amber-500">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full">
              Cancelar
            </Button>
          </DialogClose>
          <DeleteButton
            variant="destructive"
            onClick={onDelete}
            className="rounded-full"
          >
            Eliminar
          </DeleteButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavedDeleteConfirmationDialog;
