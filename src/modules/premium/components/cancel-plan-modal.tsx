import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";

import { SpinnerIcon } from "@/modules/icons/common";

interface CancelPlanModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isPending: boolean;
  handleCancelPlan: () => void;
}

const CancelPlanModal = ({
  isOpen,
  onOpenChange,
  isPending,
  handleCancelPlan,
}: CancelPlanModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="sm"
      classNames={{
        backdrop: "z-[101] bg-black/80",
        wrapper: "z-[102] pointer-events-auto",
        base: "bg-white dark:bg-full-dark",
        closeButton:
          "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="items-center p-3 md:p-6">
              <div className="flex-col">
                <h2 className="text-lg font-semibold text-main dark:text-white md:text-xl">
                  Seleccionaste el plan Gratis
                </h2>
                <p className="text-sm font-normal text-main-h dark:text-main-dark-h">
                  Al continuar, tu plan se cancelará y perderás acceso a todas
                  las funcionalidades Premium a partir de la fecha de
                  vencimiento de tu suscripción actual.
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="p-3 !pt-0 md:p-6">
              <div className="inline-flex w-full justify-between">
                <Button
                  variant="light"
                  onPress={onClose}
                  className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-dark"
                >
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  isDisabled={isPending}
                  startContent={
                    isPending ? (
                      <SpinnerIcon className="size-4 animate-spin" />
                    ) : null
                  }
                  onPress={handleCancelPlan}
                  className="rounded-md"
                >
                  {isPending ? "Cancelando plan" : "Cambiar a plan Gratis"}
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelPlanModal;
