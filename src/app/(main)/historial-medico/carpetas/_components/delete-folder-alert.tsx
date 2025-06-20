"use client";

import { Loader } from "lucide-react";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/utils";

import type { Folder } from "@/lib/types";

interface DeleteFolderAlertProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  folder: Folder | null;
  onDelete: () => void;
  isSubmitting: boolean;
}

const DeleteFolderAlert = ({
  isOpen,
  setIsOpen,
  folder,
  onDelete,
  isSubmitting,
}: DeleteFolderAlertProps) => {
  const isMobile = useIsMobile();

  const folderInfo = folder && (
    <div className="dark:bg-accent/50 mt-2 rounded-md border bg-slate-50 p-3">
      <p className="font-medium">Carpeta &quot;{folder.name}&quot;</p>
      <p className="text-muted-foreground text-sm">
        {folder.documentCount} documento{folder.documentCount !== 1 && "s"} |
        Creada el {formatDate(folder.createdAt, "dd MMMM, yyyy")}
      </p>
    </div>
  );

  const warning = (
    <p className="mt-2 text-sm text-amber-500">
      Esta acción no se puede deshacer. La carpeta y su contenido serán
      eliminados permanentemente.
    </p>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Eliminar carpeta {folder?.name}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild>
            <div className="text-foreground/80 p-4 pb-0 text-sm">
              ¿Estás seguro de que deseas eliminar esta carpeta?
              {folderInfo}
              {warning}
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
                "Eliminar"
              )}
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
          <DialogTitle>Eliminar carpeta &quot;{folder?.name}&quot;</DialogTitle>
          <DialogDescription asChild>
            <div>
              ¿Estás seguro de que deseas eliminar esta carpeta?
              {folderInfo}
              {warning}
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
            disabled={isSubmitting}
            variant="destructive"
            onClick={onDelete}
            className="rounded-full"
          >
            {isSubmitting ? "Eliminando..." : "Eliminar"}
          </DeleteButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFolderAlert;
