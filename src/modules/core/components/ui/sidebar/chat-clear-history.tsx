"use client";

import { MessageCircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

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
              <MessageCircleX strokeWidth={1.5} />
              Eliminar historial
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DrawerTrigger>
        <DrawerContent className="min-h-[30%]">
          <DrawerHeader>
            <DrawerTitle>Eliminar historial de chat</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription
            className="mt-4 space-y-1.5 px-4 text-center text-xs"
            asChild
          >
            <div>
              <p>Esto eliminará permanentemente tu historial de chat.</p>
              <p>¿Deseas continuar?</p>
            </div>
          </DrawerDescription>
          <DrawerFooter>
            <Button variant="mobile-danger" onClick={handleClearHistory}>
              Confirmar
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
              <MessageCircleX strokeWidth={1.5} />
              <span>Eliminar historial</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DialogTrigger>
        <DialogContent isSecondary>
          <DialogHeader isSecondary className="pb-6!">
            <DialogTitle>Eliminar historial de chat</DialogTitle>
            <DialogDescription>
              Esto eliminará permanentemente tu historial de chat. ¿Deseas
              continuar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleClearHistory}>
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChatClearHistory;
