"use client";

import {
  MessageSquareShare,
  MoreHorizontalIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { useChatContext } from "@/hooks/use-chat-context";
import { useChatVisibility } from "@/hooks/use-chat-visibility";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import ChatShareModal from "./chat-share-action";

import type { ChatHistory } from "@/app/(main)/(chat)/_lib/utils";
import type { Chat } from "@/db/schema";
import type { SWRInfiniteKeyedMutator } from "swr/infinite";

interface ChatActionsProps {
  chat: Chat;
  isActive?: boolean;
  mutate: SWRInfiniteKeyedMutator<ChatHistory[]>;
  handleEditMode: () => void;
}

const ChatActions = ({
  chat,
  mutate,
  isActive,
  handleEditMode,
}: ChatActionsProps) => {
  const { id } = useParams();
  const router = useRouter();

  const { activeChatId } = useChatContext();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { visibilityType } = useChatVisibility({
    chatId: chat.id,
    initialVisibilityType: chat.visibility,
  });

  const isMobile = useIsMobile();

  const { id: deleteId, title } = chat;

  const handleDelete = async () => {
    const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
      method: "DELETE",
    });
    setIsPending(true);
    toast.promise(deletePromise, {
      loading: "Eliminando chat...",
      success: () => {
        mutate((chatHistories) => {
          if (chatHistories) {
            return chatHistories.map((chatHistory) => ({
              ...chatHistory,
              chats: chatHistory.chats.filter((chat) => chat.id !== deleteId),
            }));
          }
        });
        return "Chat eliminado!";
      },
      error: "Error al eliminar el chat",
    });

    await deletePromise.finally(() => setIsPending(false));

    setShowDeleteDialog(false);

    if (deleteId === id || deleteId === activeChatId) {
      router.push("/aeris");
    }
  };

  if (isMobile) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <SidebarMenuAction
              showOnHover={!isActive}
              className="w-6 hover:bg-transparent!"
            >
              <MoreHorizontalIcon />
              <span className="sr-only">Acciones</span>
            </SidebarMenuAction>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="truncate">{title}</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                {visibilityType === "public" && (
                  <>
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        onClick={() => setShareModalOpen(true)}
                      >
                        <MessageSquareShare />
                        Compartir
                      </Button>
                    </DrawerClose>
                    <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                  </>
                )}
                <DrawerClose asChild>
                  <Button variant="mobile" onClick={handleEditMode}>
                    <Pencil />
                    Cambiar nombre
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    variant="mobile"
                    className="text-red-500 active:bg-red-500/15 active:text-red-500"
                    onClick={() => {
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 />
                    Eliminar
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DrawerContent className="min-h-[30%]">
            <DrawerHeader>
              <DrawerTitle>Eliminar chat</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription
              className="mt-4 space-y-1.5 px-4 text-center"
              asChild
            >
              <div>
                <p>
                  Esto eliminará el chat:{" "}
                  <span className="text-foreground">{chat.title}</span>.
                </p>
                <p className="font-semibold text-amber-500">
                  Esta acción no se puede deshacer. ¿Deseas continuar?
                </p>
              </div>
            </DrawerDescription>
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <DrawerClose asChild>
                  <Button variant="mobile" className="justify-center">
                    Cancelar
                  </Button>
                </DrawerClose>
              </div>
              <Button variant="mobile-destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            showOnHover={!isActive}
            className={cn("w-6", isActive && "md:hover:bg-background")}
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Acciones</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          {visibilityType === "public" && (
            <DropdownMenuItem onSelect={() => setShareModalOpen(true)}>
              <MessageSquareShare />
              Compartir
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={handleEditMode}>
            <Pencil />
            Cambiar nombre
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setShowDeleteDialog(true);
            }}
            className="text-red-500 focus:bg-red-500/10 focus:text-red-500 dark:focus:bg-red-500/15 [&_svg:not([class*='text-'])]:text-red-500"
          >
            <Trash2 />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChatShareModal
        chat={chat}
        isOpen={shareModalOpen}
        setIsOpen={setShareModalOpen}
        onCopy={() => setShareModalOpen(false)}
      />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary className="pb-6!">
            <BadgeAlert variant="warning" />
            <DialogTitle>Eliminar chat</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-1.5">
                <p>
                  Esto eliminará el chat:{" "}
                  <strong className="text-foreground">{chat.title}</strong>.
                </p>
                <p className="font-semibold text-amber-500">
                  Esta acción no se puede deshacer. ¿Deseas continuar?
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" radius="full">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              radius="full"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatActions;
