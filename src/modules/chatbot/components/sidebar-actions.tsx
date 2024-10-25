"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { DeleteIcon, ShareIcon } from "@/modules/icons/action";
import { SpinnerIcon } from "@/modules/icons/common";
import { type Chat, ServerActionResult } from "@/types/chat";

import ChatShareModal from "./chat-share-modal";

interface SidebarActionsProps {
  chat: Chat;
  shareChat: (id: string) => ServerActionResult<Chat>;
  isActive?: boolean;
  mutate: KeyedMutator<Chat[]>;
}

const SidebarActions: FC<SidebarActionsProps> = ({
  chat,
  shareChat,
  mutate,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const deletePromise = fetch(`/api/chat?id=${chat.id}`, {
      method: "DELETE",
    });

    toast.promise(
      deletePromise.then(() => {
        mutate((history) => {
          if (history) {
            return history.filter((h) => h.id !== chat.id);
          }
        });
      }),
      {
        loading: "Eliminando chat...",
        success: "Chat eliminado",
        error: "Error al eliminar chat",
      }
    );

    await deletePromise;
    setIsLoading(false);
  };

  return (
    <>
      <TooltipCTN placement="top-start" content="Compartir chat">
        <Button
          isIconOnly
          variant="light"
          disableRipple
          size="sm"
          radius="sm"
          className="!size-7 min-w-0 text-base-color dark:text-base-color-dark data-[hover=true]:bg-white dark:data-[hover=true]:bg-base-full-dark pointer-events-auto"
          aria-haspopup="menu"
          onPress={() => setShareModalOpen(true)}
        >
          <ShareIcon className="size-4" />
        </Button>
      </TooltipCTN>
      <TooltipCTN placement="top-start" content="Borrar chat">
        <Button
          isIconOnly
          variant="light"
          disableRipple
          size="sm"
          radius="sm"
          className="!size-7 min-w-0 text-base-color dark:text-base-color-dark data-[hover=true]:bg-white dark:data-[hover=true]:bg-base-full-dark pointer-events-auto"
          aria-haspopup="menu"
          isDisabled={isLoading}
          onPress={onOpen}
        >
          <DeleteIcon className="size-4" />
        </Button>
      </TooltipCTN>

      <ChatShareModal
        chat={chat}
        shareChat={shareChat}
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        onCopy={() => setShareModalOpen(false)}
      />
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
                  Esto eliminará permanentemente su mensaje de chat y eliminará
                  sus datos de nuestros servidores.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isDisabled={isLoading}
                  startContent={
                    isLoading ? (
                      <SpinnerIcon className="size-4 animate-spin" />
                    ) : null
                  }
                  onPress={handleDelete}
                  className="rounded-md"
                >
                  {isLoading ? "Eliminando..." : "Eliminar"}
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

export default SidebarActions;
