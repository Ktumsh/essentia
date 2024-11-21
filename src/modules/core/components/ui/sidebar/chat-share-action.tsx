import { Copy } from "lucide-react";
import { memo, useCallback } from "react";
import { toast } from "sonner";

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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
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

  const handleShare = useCallback(async () => {
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
  }, [copyShareLink, shareChat, chat.id]);

  const Content = memo(() => {
    return (
      <>
        <div className="mx-4 mt-4 space-y-1 rounded-md border border-gray-200 p-4 text-sm dark:border-dark md:m-0">
          <div className="font-medium">{chat.title}</div>
          <div className="text-main-m dark:text-main-dark-m">
            {chat.messages.length} mensajes
          </div>
        </div>
        <div className="flex w-full items-center space-x-2 p-4 pb-0 md:p-0">
          <Input
            id="link"
            defaultValue={
              window.location.origin + `/essentia-ai/chat/${chat.id}`
            }
            readOnly
          />
          <Button
            variant="destructive"
            size="sm"
            className="px-3"
            onClick={() => handleShare()}
          >
            <span className="sr-only">Copiar</span>
            <Copy />
          </Button>
        </div>
      </>
    );
  });

  Content.displayName = "Content";

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Compartir link al chat</DrawerTitle>
          </DrawerHeader>
          <Content />
          <DrawerFooter className="sm:justify-start">
            <DrawerClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compartir link al chat</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Compartir link al chat
          </DialogDescription>
          <Content />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChatShareModal;
