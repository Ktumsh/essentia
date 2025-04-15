"use client";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: MedicalHistoryWithTags | null;
  onDelete: () => void;
}

const DeleteConfirmationDialog = ({
  isOpen,
  setIsOpen,
  item,
  onDelete,
}: DeleteConfirmationDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Confirmar eliminación</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild>
            <div className="text-foreground/80 p-4 pb-0 text-sm">
              ¿Estás seguro de que deseas eliminar este documento médico?
              {item && (
                <div className="dark:bg-accent/50 mt-2 rounded-md border bg-slate-50 p-3">
                  <p className="font-medium">{item.condition}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.type} {item.issuer && `- ${item.issuer}`}
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
                variant="mobile"
                onClick={() => setIsOpen(false)}
                className="justify-center"
              >
                Cancelar
              </Button>
            </div>
            <Button variant="mobile-danger" onClick={onDelete}>
              Eliminar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary className="pb-6!">
          <BadgeAlert variant="warning" />
          <DialogTitle className="flex items-center gap-2">
            Confirmar eliminación
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              ¿Estás seguro de que deseas eliminar este documento médico?
              {item && (
                <div className="dark:bg-accent/50 mt-2 rounded-md border bg-slate-50 p-3">
                  <p className="font-medium">{item.condition}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.type} {item.issuer && `- ${item.issuer}`}
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

export default DeleteConfirmationDialog;
