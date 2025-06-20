"use client";

import { Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const TYPE_CONFIG = {
  document: (n: number) => ({
    label: `${n} documento${n > 1 ? "s" : ""} médico${n > 1 ? "s" : ""}`,
    title: `Eliminar ${n} documento${n > 1 ? "s" : ""}`,
    message: `Se ${n === 1 ? "enviará" : "enviarán"} a la papelera y podrás ${n === 1 ? "restaurarlo" : "restaurarlos"}.`,
  }),
  folder: (n: number) => ({
    label: `${n} carpeta${n > 1 ? "s" : ""}`,
    title: `Eliminar ${n} carpeta${n > 1 ? "s" : ""}`,
    message: `${n > 1 ? "Las carpetas" : "La carpeta"} se eliminará${n > 1 ? "n" : ""} permanentemente.`,
  }),
  recommendation: (n: number) => ({
    label: `${n} ${n === 1 ? "recomendación" : "recomendaciones"} seleccionada${n > 1 ? "s" : ""}`,
    title: `Eliminar ${n} ${n === 1 ? "recomendación" : "recomendaciones"}`,
    message: "Las recomendaciones eliminadas no se pueden restaurar.",
  }),
} as const;

interface MultiDeleteAlertProps {
  ref: React.RefObject<HTMLDivElement | null>;
  selectedCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDelete: () => void;
  isSubmitting: boolean;
  type: "document" | "folder" | "recommendation";
}

const MultiDeleteAlert = ({
  ref,
  selectedCount,
  isOpen,
  setIsOpen,
  onDelete,
  isSubmitting,
  type,
}: MultiDeleteAlertProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCount(selectedCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const { label, title, message } = useMemo(
    () => TYPE_CONFIG[type](count),
    [type, count],
  );
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent ref={ref}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild>
            <div className="p-4">
              <p className="text-foreground/80 text-sm">
                ¿Estás seguro de que deseas eliminar {label}?
              </p>
              <p className="mt-2 text-sm text-amber-500">{message}</p>
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
      <DialogContent ref={ref} isSecondary>
        <DialogHeader isSecondary className="pb-6!">
          <BadgeAlert variant="warning" />
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="text-foreground/80 text-sm">
              ¿Estás seguro de que deseas eliminar {label}?
              <p className="mt-2 text-sm text-amber-500">{message}</p>
            </div>
          </DialogDescription>
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
