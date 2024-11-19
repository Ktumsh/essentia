"use client";

import { MessageCircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ServerActionResult } from "@/types/chat";

interface ChatClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => ServerActionResult<void>;
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
        const result = await clearHistoryPromise;

        if (result && "error" in result) {
          throw new Error(result.error);
        }
        return "Historial de chat eliminado";
      },
      error: "Error al eliminar historial",
    });

    setIsOpen(false);
    router.refresh();
    router.push("/essentia-ai");
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled={!isEnabled}>
                <MessageCircleX strokeWidth={1.5} />
                Limpiar historial
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Eliminar historial de chat</DrawerTitle>
            <DrawerDescription className="text-balance px-4">
              Esto eliminará permanentemente su historial de chat y eliminará
              sus datos de nuestros servidores.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="dark:bg-full-dark">Cancelar</Button>
            </DrawerClose>
            <Button variant="destructive" onClick={handleClearHistory}>
              Continuar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled={!isEnabled}>
                <MessageCircleX strokeWidth={1.5} />
                Limpiar historial
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col gap-1">
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Esto eliminará permanentemente su historial de chat y eliminará sus
            datos de nuestros servidores.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                className="border-none hover:bg-gray-100 dark:hover:bg-full-dark"
              >
                Cancelar
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={handleClearHistory}>
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default ChatClearHistory;
