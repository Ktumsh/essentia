"use client";

import { Trash2, Upload } from "lucide-react";
import { ChangeEvent, FC, RefObject, useState } from "react";

import { AddPhotoIcon } from "@/components/icons/action";
import { Button } from "@/components/kit/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileImageDropdownProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  hasImage: boolean;
  handleMenuAction: (
    fileInputRef: RefObject<HTMLInputElement | null>,
    key: string,
  ) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({
  fileInputRef,
  hasImage,
  handleMenuAction,
  handleFileChange,
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto absolute inset-0"
          >
            <span className="sr-only">Editar foto de perfil</span>
          </button>
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Editar foto de perfil</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button
                  variant="mobile"
                  onClick={() => handleMenuAction(fileInputRef, "upload")}
                >
                  <Upload />
                  Subir foto de perfil
                </Button>
                {hasImage && (
                  <Button
                    variant="mobile"
                    onClick={() => handleMenuAction(fileInputRef, "delete")}
                  >
                    <Trash2 />
                    Eliminar
                  </Button>
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Agregar foto de perfil"
              radius="full"
              size="icon"
              className="pointer-events-auto hidden bg-black/60! hover:bg-black/50! md:inline-flex"
            >
              <AddPhotoIcon className="text-white" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent aria-label="Opciones de perfil">
            <DropdownMenuItem
              onSelect={() => handleMenuAction(fileInputRef, "upload")}
            >
              <Upload />
              Subir foto de perfil
            </DropdownMenuItem>
            {hasImage && (
              <DropdownMenuItem
                onSelect={() => handleMenuAction(fileInputRef, "delete")}
              >
                <Trash2 />
                Eliminar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <input
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        type="file"
        onChange={(e) => handleFileChange(e)}
        className="pointer-events-auto absolute size-[0.1px] bg-transparent opacity-0"
      />
    </>
  );
};

export default ProfileImageDropdown;
