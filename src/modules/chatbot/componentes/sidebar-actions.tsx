import { tooltipStyles } from "@/styles/tooltip-styles";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import ChatShareDialog from "./chat-share-modal";
import { type Chat, ServerActionResult } from "@/types/chat";
import { toast } from "sonner";
import { DeleteIcon, ShareIcon } from "@/modules/icons/action";

interface SidebarActionsProps {
  chat: Chat;
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>;
  shareChat: (id: string) => ServerActionResult<Chat>;
}

const SidebarActions: FC<SidebarActionsProps> = ({
  chat,
  removeChat,
  shareChat,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isRemovePending, startRemoveTransition] = useTransition();
  return (
    <>
      <>
        <Tooltip
          content="Compartir chat"
          delay={800}
          closeDelay={0}
          classNames={{
            content: tooltipStyles.content,
          }}
        >
          <Button
            isIconOnly
            variant="light"
            disableRipple
            size="sm"
            radius="sm"
            className="!size-7 min-w-0 dark:hover:text-white data-[hover=true]:bg-white dark:data-[hover=true]:bg-base-full-dark"
            aria-haspopup="menu"
            onClick={() => setShareDialogOpen(true)}
          >
            <ShareIcon className="size-4" />
          </Button>
        </Tooltip>
        <Tooltip
          content="Borrar chat"
          delay={800}
          closeDelay={0}
          classNames={{
            content: tooltipStyles.content,
          }}
        >
          <Button
            isIconOnly
            variant="light"
            disableRipple
            size="sm"
            radius="sm"
            className="!size-7 min-w-0 dark:hover:text-white data-[hover=true]:bg-white dark:data-[hover=true]:bg-base-full-dark"
            aria-haspopup="menu"
            isDisabled={isRemovePending}
            onPress={onOpen}
          >
            <DeleteIcon className="size-4" />
          </Button>
        </Tooltip>
      </>
      <ChatShareDialog
        chat={chat}
        shareChat={shareChat}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopy={() => setShareDialogOpen(false)}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "bg-white dark:bg-base-full-dark",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose: () => void) => (
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
                  onPress={() => {
                    startRemoveTransition(async () => {
                      const result = await removeChat({
                        id: chat.id,
                        path: chat.path,
                      });

                      if (result && "error" in result) {
                        toast.error(result.error);
                        return;
                      }

                      onOpen();
                      router.refresh();
                      router.push("/essentia-ai");
                      toast.success("Chat eliminado");
                    });
                  }}
                >
                  Eliminar
                </Button>
                <Button variant="light" onPress={onClose}>
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
