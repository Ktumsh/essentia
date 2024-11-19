import { useCallback } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import { type Chat, ServerActionResult } from "@/types/chat";

interface ChatShareModalProps {
  chat: Pick<Chat, "id" | "title" | "messages">;
  shareChat: (id: string) => ServerActionResult<Chat>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCopy: () => void;
}

const ChatShareModal = ({
  chat,
  shareChat,
  isOpen,
  setIsOpen,
  onCopy,
}: ChatShareModalProps) => {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });

  const isMobile = useIsMobile();

  const copyShareLink = useCallback(
    async (chat: Chat) => {
      const url = new URL(window.location.href);
      url.pathname = chat.share_path;
      copyToClipboard(url.toString());
      onCopy();
    },
    [copyToClipboard, onCopy],
  );

  const handleShare = async () => {
    const sharePromise = shareChat(chat.id);

    toast.promise(sharePromise, {
      loading: "Copiando enlace del chat...",
      success: async (result) => {
        if (result && "error" in result) {
          throw new Error(result.error);
        }

        copyShareLink(result);
        return "Enlace copiado";
      },
      error: "No se pudo copiar el enlace para compartir",
    });
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Compartir link al chat</DrawerTitle>
          </DrawerHeader>
          <div className="mx-4 mt-4 space-y-1 rounded-md border border-gray-200 p-4 text-sm dark:border-full-dark">
            <div className="font-medium">{chat.title}</div>
            <div className="text-main-m dark:text-main-dark-m">
              {chat.messages.length} mensajes
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="dark:bg-full-dark">Cancelar</Button>
            </DrawerClose>
            <Button variant="destructive" onClick={() => handleShare()}>
              Continuar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Compartir link al chat</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Cualquier persona que tenga la URL podrá ver el chat compartido.
          </AlertDialogDescription>
          <div className="space-y-1 rounded-md border border-gray-200 p-4 text-sm dark:border-full-dark">
            <div className="font-medium">{chat.title}</div>
            <div className="text-main-m dark:text-main-dark-m">
              {chat.messages.length} mensajes
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                className="border-none hover:bg-gray-100 dark:hover:bg-full-dark"
              >
                Cancelar
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={() => handleShare()}>
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default ChatShareModal;
