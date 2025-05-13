"use client";

import { QuoteLeftIcon } from "@/components/icons/common";
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
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { Markdown } from "@/components/markdown";
import { useIsMobile } from "@/hooks/use-mobile";

interface BioModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bio: string;
}

const BioModal = ({ isOpen, setIsOpen, bio }: BioModalProps) => {
  const isMobile = useIsMobile();

  const content = (
    <div className="overflow-y-auto px-4 pt-4 md:my-4 md:px-6 md:pt-0">
      <div className="border-border border-l-3 py-4 pl-4">
        <QuoteLeftIcon className="text-border mb-4 size-8" />
        <Markdown className="prose-sm md:prose md:text-base!">{bio}</Markdown>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Información personalizada</DrawerTitle>
            <DrawerDescription className="sr-only">
              Información personalizada del usuario
            </DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" className="justify-center">
                  Cerrar
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <BadgeAlert variant="info" />
          <DialogTitle>Información personalizada</DialogTitle>
          <DialogDescription className="sr-only">
            Información personalizada del usuario
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
