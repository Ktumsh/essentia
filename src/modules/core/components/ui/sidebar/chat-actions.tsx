"use client";

import { MessageSquareShare, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { useChatVisibility } from "@/modules/chatbot/hooks/use-chat-visibility";
import { cn } from "@/utils/common";

import ChatShareModal from "./chat-share-action";

import type { Chat } from "@/db/schema";

interface ChatActionsProps {
  chat: Chat;
  isActive?: boolean;
  mutate: KeyedMutator<Chat[]>;
}

const ChatActions = ({ chat, mutate, isActive }: ChatActionsProps) => {
  const { id } = useParams();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { visibilityType } = useChatVisibility({
    chatId: chat.id,
    initialVisibility: chat.visibility,
  });

  const isMobile = useIsMobile();

  const deleteId = chat.id;

  const handleDelete = async () => {
    const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
      method: "DELETE",
    });
    setIsPending(true);
    toast.promise(deletePromise, {
      loading: "Eliminando chat...",
      success: () => {
        mutate((history) => {
          if (history) {
            return history.filter((h) => h.id !== id);
          }
        });
        return "Chat eliminado!";
      },
      error: "Error al eliminar el chat",
    });

    await deletePromise.finally(() => setIsPending(false));

    setShowDeleteDialog(false);

    if (deleteId === id) {
      router.push("/essentia-ai");
    }
  };

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <SidebarMenuAction
              showOnHover={!isActive}
              className="w-6 hover:!bg-transparent"
            >
              <MoreHorizontalIcon />
              <span className="sr-only">Acciones</span>
            </SidebarMenuAction>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Chat</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              {visibilityType === "public" && (
                <DrawerClose asChild>
                  <Button
                    variant="mobile"
                    onClick={() => setShareModalOpen(true)}
                  >
                    <MessageSquareShare strokeWidth={1.5} />
                    Compartir
                  </Button>
                </DrawerClose>
              )}
              <DrawerClose asChild>
                <Button
                  variant="mobile"
                  className="text-destructive active:bg-destructive/15 active:text-destructive dark:text-red-500 dark:active:bg-red-500/15 dark:active:text-red-400"
                  onClick={() => {
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 strokeWidth={1.5} />
                  Eliminar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              showOnHover={!isActive}
              className={cn(
                "w-6",
                isActive && "md:hover:bg-white md:dark:hover:bg-full-dark",
              )}
            >
              <MoreHorizontalIcon />
              <span className="sr-only">Acciones</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {visibilityType === "public" && (
              <DropdownMenuItem onSelect={() => setShareModalOpen(true)}>
                <MessageSquareShare strokeWidth={1.5} />
                Compartir
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onSelect={() => {
                setShowDeleteDialog(true);
              }}
              className="text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500 dark:focus:bg-red-500/15 dark:focus:text-red-400"
            >
              <Trash2 strokeWidth={1.5} />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <ChatShareModal
        chat={chat}
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        onCopy={() => setShareModalOpen(false)}
      />

      {isMobile ? (
        <Drawer open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Eliminar chat</DrawerTitle>
              <DrawerDescription className="px-4" asChild>
                <div>
                  <p>
                    Esto eliminará el chat:{" "}
                    <span className="text-main dark:text-main-dark">
                      {chat.title}
                    </span>
                    .
                  </p>
                  <p>¿Deseas continuar?</p>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
              <Button variant="destructive" onClick={handleDelete}>
                Continuar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent isSecondary>
            <DialogHeader isSecondary className="!pb-6">
              <DialogTitle>Eliminar chat</DialogTitle>
              <DialogDescription asChild>
                <div>
                  <p>
                    Esto eliminará el chat:{" "}
                    <span className="text-main dark:text-main-dark">
                      {chat.title}
                    </span>
                    .
                  </p>
                  <p>¿Deseas continuar?</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                disabled={isPending}
                variant="destructive"
                onClick={handleDelete}
              >
                Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ChatActions;
