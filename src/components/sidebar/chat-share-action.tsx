"use client";

import { Copy } from "lucide-react";
import { memo, useCallback } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { BadgeAlert } from "@/components/ui/badge-alert";
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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/utils";

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
  const [, copyToClipboard] = useCopyToClipboard();

  const isMobile = useIsMobile();

  const copyShareLink = useCallback(
    async (chat: Chat) => {
      const url = new URL(window.location.href);
      url.pathname = `/aeris/chat/${chat.id}`;
      copyToClipboard(url.toString());
      onCopy();
      toast.success("Enlace copiado");
    },
    [copyToClipboard, onCopy],
  );

  const Content = memo(() => {
    return (
      <div className="space-y-4 p-6 pb-0 md:p-6">
        <div className="border-border space-y-1 rounded-md border p-4 text-sm">
          <div className="font-medium text-green-500">{chat.title}</div>
          <div className="text-muted-foreground">
            {formatDate(chat.createdAt, "d 'de' MMMM, yyyy")}
          </div>
        </div>
        <div className="flex w-full items-center space-x-2">
          <Input
            className="text-sm"
            defaultValue={window.location.origin + `/aeris/chat/${chat.id}`}
            readOnly
          />
          <Button
            size="sm"
            className="px-3"
            onClick={() => copyShareLink(chat)}
          >
            <span className="sr-only">Copiar</span>
            <Copy />
          </Button>
        </div>
      </div>
    );
  });

  Content.displayName = "Content";

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="min-h-[60%]">
          <DrawerHeader>
            <DrawerTitle>Compartir enlace al chat</DrawerTitle>
            <DrawerDescription className="sr-only">
              Compartir enlace al chat
            </DrawerDescription>
          </DrawerHeader>
          <Content />
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" className="justify-center">
                  Cerrar
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary>
            <BadgeAlert variant="success" />
            <DialogTitle>Compartir enlace al chat</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Compartir enlace al chat
          </DialogDescription>
          <Content />
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" radius="full">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChatShareModal;
