import { Loader } from "lucide-react";

import { useIsMobile } from "@/components/hooks/use-mobile";
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

interface CancelPlanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isPending: boolean;
  handleCancelPlan: () => void;
}

const CancelPlanModal = ({
  isOpen,
  setIsOpen,
  isPending,
  handleCancelPlan,
}: CancelPlanModalProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Seleccionaste el plan Gratis</DrawerTitle>
            <DrawerDescription className="mt-4 px-6 text-start">
              Al continuar, tu plan se cancelará y perderás acceso a todas las
              funcionalidades Premium a partir de la fecha de vencimiento de tu
              suscripción actual.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DrawerClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleCancelPlan}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              {isPending ? null : "Cambiar a plan Gratis"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary className="mb-5">
            <DialogTitle>Seleccionaste el plan Gratis</DialogTitle>
            <DialogDescription>
              Al continuar, tu plan se cancelará y perderás acceso a todas las
              funcionalidades Premium a partir de la fecha de vencimiento de tu
              suscripción actual.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleCancelPlan}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              {isPending ? null : "Cambiar a plan Gratis"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CancelPlanModal;
