"use client";

import { MessageCircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/kit/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => Promise<void>;
}

const ChatClearHistory: FC<ChatClearHistoryProps> = ({
  isEnabled = false,
  clearChats,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  const handleClearHistory = async () => {
    const clearHistoryPromise = clearChats();

    toast.promise(clearHistoryPromise, {
      loading: "Eliminando historial...",
      success: async () => {
        await clearHistoryPromise;
        return "Historial de chat eliminado";
      },
      error: "Error al eliminar historial",
    });

    setIsOpen(false);
    router.refresh();
    router.replace("/essentia-ai");
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <SidebarMenuItem>
            <SidebarMenuButton disabled={!isEnabled}>
              <MessageCircleX />
              Eliminar historial
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DrawerTrigger>
        <DrawerContent className="min-h-[30%]">
          <DrawerHeader>
            <DrawerTitle>Eliminar historial de chat</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription
            className="mt-4 space-y-1.5 px-4 text-center"
            asChild
          >
            <div>
              <p>Esto eliminará permanentemente tu historial de chat.</p>
              <p className="font-semibold text-amber-500">¿Deseas continuar?</p>
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
            <Button variant="mobile-primary" onClick={handleClearHistory}>
              Sí, continuar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled={!isEnabled}
              tooltip="Eliminar historial de chat"
            >
              <MessageCircleX />
              <span>Eliminar historial</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DialogTrigger>
        <DialogContent isSecondary>
          <DialogHeader isSecondary className="pb-6!">
            <BadgeAlert variant="warning" />
            <DialogTitle>Eliminar historial de chat</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-1.5">
                <p>Esto eliminará permanentemente tu historial de chat.</p>
                <p className="font-semibold text-amber-500">
                  ¿Deseas continuar?
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
            <Button radius="full" onClick={handleClearHistory}>
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChatClearHistory;
