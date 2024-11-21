"use client";

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { MessageSquareShare, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

import { useIsMobile } from "@/components/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import ChatShareModal from "@/modules/core/components/ui/sidebar/chat-share-action";
import { type Chat, ServerActionResult } from "@/types/chat";

interface ChatActionsProps {
  chat: Chat;
  shareChat: (id: string) => ServerActionResult<Chat>;
  isActive?: boolean;
  mutate: KeyedMutator<Chat[]>;
}

const ChatActions: FC<ChatActionsProps> = ({
  chat,
  shareChat,
  mutate,
  isActive,
}) => {
  const { id } = useParams();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isMobile = useIsMobile();

  const deleteId = chat.id;

  const handleDelete = async () => {
    const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
      method: "DELETE",
    });

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
          <DropdownMenuItem onSelect={() => setShareModalOpen(true)}>
            <MessageSquareShare strokeWidth={1.5} />
            Compartir
          </DropdownMenuItem>
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
        shareChat={shareChat}
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        onCopy={() => setShareModalOpen(false)}
      />

      {isMobile ? (
        <Drawer open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Eliminar chat</DrawerTitle>
              <DrawerDescription className="px-4">
                Esto eliminará el chat: {chat.title}. ¿Deseas continuar?
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
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Esto eliminará el chat: {chat.title}. ¿Deseas continuar?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Cancelar</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={handleDelete}>
                  Continuar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ChatActions;
