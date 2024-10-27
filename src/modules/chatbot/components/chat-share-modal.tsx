import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FC, useCallback, useTransition } from "react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import { SpinnerIcon } from "@/modules/icons/common";
import { type Chat, ServerActionResult } from "@/types/chat";

interface ChatShareModalProps {
  chat: Pick<Chat, "id" | "title" | "messages">;
  shareChat: (id: string) => ServerActionResult<Chat>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCopy: () => void;
}

const ChatShareModal: FC<ChatShareModalProps> = ({
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
      if (!chat.share_path) {
        return toast.error("No se pudo copiar el enlace para compartir");
      }

      const url = new URL(window.location.href);
      url.pathname = chat.share_path;
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
        <>
          <ModalHeader className="flex flex-col gap-1">
            Compartir link al chat
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4 text-main dark:text-main-dark">
              <p className="text-sm text-main-m dark:text-main-dark-m">
                Cualquier persona que tenga la URL podrá ver el chat compartido.
              </p>
              <div className="p-4 space-y-1 text-sm border border-gray-200 dark:border-dark rounded-md">
                <div className="font-medium">{chat.title}</div>
                <div className="text-main-m dark:text-main-dark-m">
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
                startShareTransition(async () => {
                  const result = await shareChat(chat.id);

                  if (result && "error" in result) {
                    toast.error(result.error);
                    return;
                  }

                  copyShareLink(result);
                });
              }}
              className="rounded-md"
            >
              {isSharePending ? <>Copiando...</> : <>Copiar link</>}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ChatShareModal;
