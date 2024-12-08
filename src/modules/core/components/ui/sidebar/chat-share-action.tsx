"use client";

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
import { formatDate } from "@/utils/format";

import type { Chat } from "@/db/schema";

interface ChatShareModalProps {
  chat: Chat;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCopy: () => void;
}

const ChatShareModal = ({
  chat,
  isOpen,
  setIsOpen,
  onCopy,
}: ChatShareModalProps) => {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });

  const isMobile = useIsMobile();

  const copyShareLink = useCallback(
    async (chat: Chat) => {
      const url = new URL(window.location.href);
      url.pathname = `/essentia-ai/chat/${chat.id}`;
      copyToClipboard(url.toString());
      onCopy();
      toast.success("Enlace copiado");
    },
    [copyToClipboard, onCopy],
  );

  const Content = memo(() => {
    return (
      <>
        <div className="mx-4 mt-4 space-y-1 rounded-md border border-gray-200 p-4 text-sm dark:border-dark md:m-0">
          <div className="font-medium">{chat.title}</div>
          <div className="text-main-m dark:text-main-dark-m">
            {formatDate(chat.createdAt, "d 'de' MMMM, yyyy")}
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
            onClick={() => copyShareLink(chat)}
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
            <DrawerTitle>Compartir enlace al chat</DrawerTitle>
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
            <DialogTitle>Compartir enlace al chat</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Compartir enlace al chat
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
