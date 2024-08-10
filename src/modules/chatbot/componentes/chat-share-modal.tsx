import { FC, useCallback, useTransition } from "react";

import { toast } from "sonner";

import { type Chat, ServerActionResult } from "@/types/chat";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import { SpinnerIcon } from "@/modules/icons/common";

interface ChatShareDialogProps {
  chat: Pick<Chat, "id" | "title" | "messages">;
  shareChat: (id: string) => ServerActionResult<Chat>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCopy: () => void;
}

const ChatShareDialog: FC<ChatShareDialogProps> = ({
  chat,
  shareChat,
  open,
  onOpenChange,
  onCopy,
}) => {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });
  const [isSharePending, startShareTransition] = useTransition();

  const copyShareLink = useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error("No se pudo copiar el enlace para compartir");
      }

      const url = new URL(window.location.href);
      url.pathname = chat.sharePath;
      copyToClipboard(url.toString());
      onCopy();
      toast.success("Enlace copiado");
    },
    [copyToClipboard, onCopy]
  );
  return (
    <Modal
      isOpen={open}
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
              Compartir link al chat
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 text-base-color dark:text-base-color-dark">
                <p className="text-sm text-base-color-m dark:text-base-color-dark-m">
                  Cualquier persona que tenga la URL podrá ver el chat
                  compartido.
                </p>
                <div className="p-4 space-y-1 text-sm border border-gray-200 dark:border-base-dark rounded-md">
                  <div className="font-medium">{chat.title}</div>
                  <div className="text-base-color-m dark:text-base-color-dark-m">
                    {chat.messages.length} mensajes
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                disabled={isSharePending}
                startContent={
                  isSharePending ? (
                    <SpinnerIcon className="size-4 animate-spin" />
                  ) : null
                }
                onPress={() => {
                  // @ts-ignore
                  startShareTransition(async () => {
                    const result = await shareChat(chat.id);

                    if (result && "error" in result) {
                      toast.error(result.error);
                      return;
                    }

                    copyShareLink(result);
                  });
                }}
              >
                {isSharePending ? <>Copiando...</> : <>Copiar link</>}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChatShareDialog;
