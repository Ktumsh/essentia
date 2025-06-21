"use client";

import { Loader } from "lucide-react";

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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface InitializeRouteAlertProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleStartRoute: () => void;
  processing: boolean;
}

const InitializeRouteAlert = ({
  isOpen,
  setIsOpen,
  handleStartRoute,
  processing,
}: InitializeRouteAlertProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Iniciar ruta</DrawerTitle>
            <DrawerDescription className="px-4" asChild>
              <div>
                <p>Para comenzar con esta lección, debes iniciar la ruta.</p>
                <p className="font-semibold text-pink-500">
                  ¿Deseas iniciarla ahora?
                </p>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" disabled={processing}>
                  Cancelar
                </Button>
              </DrawerClose>
            </div>
            <Button
              variant="mobile-primary"
              disabled={processing}
              onClick={handleStartRoute}
            >
              Iniciar ruta
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
          <BadgeAlert variant="question" />
          <DialogTitle>Iniciar ruta</DialogTitle>
          <DialogDescription>
            Para comenzar con esta lección, debes iniciar el ruta. ¿Deseas
            iniciarla ahora?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full" disabled={processing}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={processing}
            radius="full"
            onClick={handleStartRoute}
          >
            {processing ? (
              <Loader className="animate-spin" />
            ) : (
              <>Iniciar ruta</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InitializeRouteAlert;
