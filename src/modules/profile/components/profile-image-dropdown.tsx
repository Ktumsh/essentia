"use client";

import { Trash2, Upload } from "lucide-react";
import { ChangeEvent, FC, RefObject } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddPhotoIcon, EditIcon } from "@/modules/icons/action";
import { cn } from "@/utils/common";

interface ProfileImageDropdownProps {
  type: "profile" | "banner";
  fileInputRef: RefObject<HTMLInputElement | null>;
  hasImage: boolean;
  handleMenuAction: (
    fileInputRef: RefObject<HTMLInputElement | null>,
    key: string,
    type: "profile" | "banner",
  ) => void;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner",
  ) => void;
}

const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({
  type,
  fileInputRef,
  hasImage,
  handleMenuAction,
  handleFileChange,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {type === "banner" ? (
            <Button
              aria-label="Agregar foto de portada"
              radius="full"
              size="icon"
              className="pointer-events-auto z-10 !size-8 min-w-0 !bg-black/60 shadow-none hover:!bg-black/50 md:!size-10 md:min-w-10"
            >
              <AddPhotoIcon className="size-4 text-white md:!size-5" />
            </Button>
          ) : (
            <Button
              aria-label="Agregar foto de perfil"
              radius="full"
              size="icon"
              className={cn(
                !isMobile
                  ? "!bg-black/60 hover:!bg-black/50"
                  : "absolute -bottom-11 -right-11 inline-flex size-8 border-2 border-gray-200 bg-white dark:border-dark dark:bg-full-dark md:hidden",
                "pointer-events-auto z-10 shadow-none",
              )}
            >
              {!isMobile ? (
                <AddPhotoIcon className="!size-5 text-white" />
              ) : (
                <EditIcon className="size-4 text-main dark:text-main-dark" />
              )}
            </Button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent aria-label={`Opciones de ${type}`}>
          <DropdownMenuItem
            onSelect={() => handleMenuAction(fileInputRef, "upload", type)}
          >
            <Upload className="size-4" />
            Subir foto de {type === "profile" ? "perfil" : "portada"}
          </DropdownMenuItem>
          {hasImage && (
            <DropdownMenuItem
              onSelect={() => handleMenuAction(fileInputRef, "delete", type)}
            >
              <Trash2 className="size-4" />
              Eliminar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        type="file"
        onChange={(e) => handleFileChange(e, type)}
        className="pointer-events-auto absolute size-[0.1px] bg-transparent opacity-0"
      />
    </>
  );
};

export default ProfileImageDropdown;
