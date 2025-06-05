"use client";

import { Copy, PencilLine } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onEdit: () => void;
  onCopy: () => void;
}

const EditModal = ({ isOpen, setIsOpen, onEdit, onCopy }: EditModalProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
            <DrawerClose asChild>
              <Button variant="mobile" onClick={onCopy}>
                <Copy />
                Copiar mensaje
              </Button>
            </DrawerClose>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <DrawerClose asChild>
              <Button variant="mobile" onClick={onEdit}>
                <PencilLine />
                Editar mensaje
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditModal;
