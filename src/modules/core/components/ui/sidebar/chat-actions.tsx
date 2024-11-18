"use client";

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { MoreHorizontalIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import ChatShareModal from "@/modules/chatbot/components/chat-share-modal";
import { DeleteIcon, ShareIcon } from "@/modules/icons/action";
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
        return "Chat eliminado exitosamente";
      },
      error: "Error al eliminar el chat",
    });

    setShowDeleteDialog(false);

    if (deleteId === id) {
      router.push("/");
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
            <ShareIcon className="size-4" />
            <span>Compartir</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setShowDeleteDialog(true);
            }}
            className="text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500 dark:focus:bg-red-500/15 dark:focus:text-red-400"
          >
            <DeleteIcon className="size-4" />
            <span>Borrar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChatShareModal
        chat={chat}
        shareChat={shareChat}
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        onCopy={() => setShareModalOpen(false)}
      />
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Esto eliminará permanentemente su mensaje de chat y eliminará sus
            datos de nuestros servidores.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChatActions;
