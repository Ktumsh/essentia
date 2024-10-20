"use client";

import { SpinnerIcon } from "@/modules/icons/common";
import { ServerActionResult } from "@/types/chat";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";
import { toast } from "sonner";

interface ClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => ServerActionResult<void>;
}

const ClearHistory: FC<ClearHistoryProps> = ({
  isEnabled = false,
  clearChats,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const handleClearHistory = async () => {
    startTransition(async () => {
      const result = await clearChats();

      if (result && "error" in result) {
        toast.error(result.error);
        return;
      }

      onOpenChange();
      router.refresh();
      router.push("/essentia-ai");
      toast.success("Historial eliminado");
    });
  };

  return (
    <>
      <div className="flex items-center justify-end w-full h-10 mt-4">
        <Button
          onPress={onOpen}
          variant="light"
          isDisabled={!isEnabled || isPending}
          className="h-10 rounded-xl px-3 font-medium text-sm text-base-color-h dark:text-base-color-dark-h disabled:pointer-events-none disabled:opacity-50 data-[hover=true]:bg-transparent"
        >
          {isPending && <SpinnerIcon className="mr-2" />}
          Limpiar historial
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102] pointer-events-auto",
          base: "bg-white dark:bg-base-full-dark",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Estás absolutamente seguro?
              </ModalHeader>
              <ModalBody>
                <p className="text-base-color-m dark:text-base-color-dark-m">
                  Esto eliminará permanentemente su historial de chat y
                  eliminará sus datos de nuestros servidores.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={handleClearHistory}
                  isDisabled={isPending}
                  startContent={
                    isPending ? (
                      <SpinnerIcon className="size-4 animate-spin" />
                    ) : null
                  }
                  className="rounded-md"
                >
                  {isPending ? "Eliminando..." : "Eliminar"}
                </Button>
                <Button
                  variant="light"
                  onPress={onClose}
                  className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-dark"
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClearHistory;
