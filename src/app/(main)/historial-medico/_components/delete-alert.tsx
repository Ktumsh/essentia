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
import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";

interface DeleteAlertProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: MedicalHistory | null;
  onDelete: () => void;
  isSubmitting: boolean;
}

const DeleteAlert = ({
  isOpen,
  setIsOpen,
  item,
  onDelete,
  isSubmitting,
}: DeleteAlertProps) => {
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
                Se enviará a la papelera y podrás restaurarlo.
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary className="pb-6!">
          <BadgeAlert variant="warning" />
          <DialogTitle>Confirmar eliminación</DialogTitle>
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
                Se enviará a la papelera y podrás restaurarlo.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full">
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

export default DeleteAlert;
