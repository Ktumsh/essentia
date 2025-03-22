"use client";

import { PencilLine } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/kit/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMode: Dispatch<SetStateAction<"view" | "edit">>;
}

const EditModal = ({ isOpen, setIsOpen, setMode }: EditModalProps) => {
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
              <Button variant="mobile" onClick={() => setMode("edit")}>
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
