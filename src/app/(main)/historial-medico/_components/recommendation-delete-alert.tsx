import { Loader } from "lucide-react";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import {
  getPriorityBgColor,
  getPriorityColor,
  getPriorityText,
} from "../_lib/utils";

interface RecommendationDeleteAlertProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  recommendationToDelete: SavedAIRecommendation | null;
  onDelete: () => void;
  isSubmitting: boolean;
}

const RecommendationDeleteAlert = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  recommendationToDelete,
  onDelete,
  isSubmitting,
}: RecommendationDeleteAlertProps) => {
  const isMobile = useIsMobile();

  const priorityText = getPriorityText(
    recommendationToDelete?.priority || "low",
  );

  const priorityColor = getPriorityColor(
    recommendationToDelete?.priority || "low",
  );

  const priorityBg = getPriorityBgColor(
    recommendationToDelete?.priority || "low",
  );

  if (isMobile) {
    return (
      <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Confirmar eliminación</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild>
            <div className="text-foreground/80 p-4 pb-0 text-sm">
              ¿Estás seguro de que deseas eliminar esta recomendación guardada?
              {recommendationToDelete && (
                <div className={cn("mt-2 rounded-md p-3", priorityBg)}>
                  <p className="text-foreground font-medium">
                    {recommendationToDelete.title}
                  </p>
                  <p className={cn("text-sm font-medium", priorityColor)}>
                    Prioridad: {priorityText}
                  </p>
                </div>
              )}
              <p className="mt-2 text-sm text-amber-500">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </DrawerDescription>
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button
                disabled={isSubmitting}
                variant="mobile"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="justify-center"
              >
                No, cancelar
              </Button>
            </div>
            <Button
              disabled={isSubmitting}
              variant="mobile-destructive"
              onClick={onDelete}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Sí, eliminar"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

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
                <div className={cn("mt-2 rounded-md p-3", priorityBg)}>
                  <p className="text-foreground font-medium">
                    {recommendationToDelete.title}
                  </p>
                  <p className={cn("text-sm", priorityColor)}>
                    Prioridad: {priorityText}
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
            <Button disabled={isSubmitting} variant="outline" radius="full">
              No, cancelar
            </Button>
          </DialogClose>
          <DeleteButton
            disabled={isSubmitting}
            variant="destructive"
            onClick={onDelete}
            className="rounded-full"
          >
            {isSubmitting ? "Eliminando..." : "Sí, eliminar"}
          </DeleteButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDeleteAlert;
