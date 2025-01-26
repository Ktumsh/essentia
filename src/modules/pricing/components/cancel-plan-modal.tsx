import { Loader } from "lucide-react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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

interface CancelPlanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isPending: boolean;
  handleCancelPlan: () => void;
}

const Description = () => {
  return (
    <>
      Al <span className="font-semibold">continuar</span>, tu plan se cancelará
      y perderás acceso a todas las funcionalidades Premium a partir de la fecha
      de vencimiento de tu suscripción actual.
    </>
  );
};

const CancelPlanModal = ({
  isOpen,
  setIsOpen,
  isPending,
  handleCancelPlan,
}: CancelPlanModalProps) => {
  const isMobile = useIsMobile();

  const title = "Cambiar al plan Gratis";

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription className="mt-4 px-4 text-start">
              <Description />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleCancelPlan}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              {isPending ? null : "Continuar"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary className="pb-6!">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              <Description />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter isSecondary>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleCancelPlan}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              {isPending ? null : "Continuar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CancelPlanModal;
