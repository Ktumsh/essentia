"use client";

import { QuoteLeftIcon } from "@/components/icons/common";
import { Markdown } from "@/components/markdown";
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
} from "@/components/ui/drawer";
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
        {bio ? (
          <Markdown className="prose-sm md:prose md:text-base!">{bio}</Markdown>
        ) : (
          <p className="text-foreground/80">
            Aún no has entregado instrucciones personalizadas para{" "}
            <strong className="text-foreground font-medium">Aeris</strong>, tu
            asistente de salud. <br />
            Completar esta información nos ayudará a brindarte una experiencia
            más útil y adaptada a tus necesidades.
          </p>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Instrucciones para Aeris</DrawerTitle>
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
          <DialogTitle>Instrucciones para Aeris</DialogTitle>
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
