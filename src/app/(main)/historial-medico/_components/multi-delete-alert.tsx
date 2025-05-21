"use client";

import { Loader } from "lucide-react";

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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/kit/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface MultiDeleteAlertProps {
  ref: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDelete: () => void;
  isSubmitting: boolean;
  type: "document" | "folder" | "recommendation";
}

const typeLabels = {
  document: "los documentos médicos seleccionados",
  folder: "las carpetas médicas seleccionadas",
  recommendation: "las recomendaciones seleccionadas",
};

const typeTitles = {
  document: "Eliminar documentos",
  folder: "Eliminar carpetas",
  recommendation: "Eliminar recomendaciones",
};

const typeMessages = {
  document: "Se enviarán a la papelera y podrás restaurarlos.",
  folder: "Las carpetas se eliminarán permanentemente.",
  recommendation: "Las recomendaciones eliminadas no se pueden restaurar.",
};

const MultiDeleteAlert = ({
  ref,
  isOpen,
  setIsOpen,
  onDelete,
  isSubmitting,
  type,
}: MultiDeleteAlertProps) => {
  const isMobile = useIsMobile();

  const message = (
    <div className="text-foreground/80 text-sm">
      ¿Estás seguro de que deseas eliminar {typeLabels[type]}?
      <p className="mt-2 text-sm text-amber-500">{typeMessages[type]}</p>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent ref={ref}>
          <DrawerHeader>
            <DrawerTitle>{typeTitles[type]}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild>
            <div className="p-4">{message}</div>
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
              variant="mobile-primary"
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
      <DialogContent ref={ref} isSecondary>
        <DialogHeader isSecondary className="pb-6!">
          <BadgeAlert variant="warning" />
          <DialogTitle>{typeTitles[type]}</DialogTitle>
          <DialogDescription asChild>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={isSubmitting}
            variant="destructive"
            radius="full"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultiDeleteAlert;
