"use client";

import React, { Dispatch, SetStateAction } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PencilEditIcon } from "@/modules/icons/action";

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
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="mobile" onClick={() => setMode("edit")}>
              <PencilEditIcon strokeWidth={1.5} />
              Editar mensaje
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditModal;
