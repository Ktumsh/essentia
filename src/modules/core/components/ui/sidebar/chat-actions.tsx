"use client";

import { MessageSquareShare, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
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
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { useChatVisibility } from "@/modules/chatbot/hooks/use-chat-visibility";

import ChatShareModal from "./chat-share-action";

import type { Chat } from "@/db/schema";

interface ChatActionsProps {
  chat: Chat;
  isActive?: boolean;
  mutate: KeyedMutator<Chat[]>;
}

const ChatActions: FC<ChatActionsProps> = ({ chat, mutate, isActive }) => {
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
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover={!isActive} className="w-6">
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
            Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
                <Button variant="secondary">Cancelar</Button>
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
