import { Loader } from "lucide-react";

import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface CancelPlanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isPending: boolean;
  handleCancelPlan: () => void;
}

const description = (
  <>
    Al <span className="font-semibold text-amber-500">continuar</span>, tu plan
    se cancelará y{" "}
    <span className="font-semibold text-amber-500">
      perderás acceso a todas las funcionalidades Premium
    </span>{" "}
    a partir de la fecha de vencimiento de tu suscripción actual.
  </>
);

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
        <DrawerContent className="min-h-[40%]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="mt-4 px-4 text-start">
            {description}
          </DrawerDescription>
          <DrawerFooter>
            <Button
              variant="mobile-danger"
              disabled={isPending}
              onClick={handleCancelPlan}
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Continuar"
              )}
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
            <BadgeAlert variant="warning" />
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter isSecondary>
            <Button
              radius="full"
              disabled={isPending}
              onClick={handleCancelPlan}
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Continuar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CancelPlanModal;
