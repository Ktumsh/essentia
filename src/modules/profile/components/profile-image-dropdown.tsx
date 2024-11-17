import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChangeEvent, FC, RefObject } from "react";

import useWindowSize from "@/modules/core/hooks/use-window-size";
import {
  AddPhotoIcon,
  UploadIcon,
  DeleteIcon,
  EditIcon,
} from "@/modules/icons/action";
import { cn } from "@/utils/common";

interface ProfileImageDropdownProps {
  type: "profile" | "banner";
  fileInputRef: RefObject<HTMLInputElement | null>;
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
  handleMenuAction,
  handleFileChange,
}) => {
  const windowSize = useWindowSize();
  return (
    <>
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content:
            "p-1 bg-gradient-to-br from-white to-gray-100 dark:from-dark dark:to-full-dark border border-gray-200 dark:border-dark rounded-lg",
        }}
      >
        <DropdownTrigger>
          {type === "banner" ? (
            <Button
              aria-label="Agregar foto de portada"
              radius="full"
              isIconOnly
              className="pointer-events-auto z-10 !size-8 min-w-0 bg-black/60 md:!size-10 md:min-w-10"
            >
              <AddPhotoIcon className="size-4 text-white md:size-5" />
            </Button>
          ) : (
            <Button
              aria-label="Agregar foto de perfil"
              radius="full"
              isIconOnly
              size={windowSize.width > 768 ? "md" : "sm"}
              className={cn(
                windowSize.width > 768
                  ? "bg-black/60"
                  : "absolute -bottom-11 -right-11 inline-flex border-2 border-gray-200 bg-white dark:border-dark dark:bg-full-dark md:hidden",
                "pointer-events-auto z-10",
              )}
            >
              {windowSize.width > 768 ? (
                <AddPhotoIcon className="size-5 text-white" />
              ) : (
                <EditIcon className="size-4 text-main dark:text-main-dark" />
              )}
            </Button>
          )}
        </DropdownTrigger>

        <DropdownMenu
          aria-label={`Opciones de ${type}`}
          variant="flat"
          onAction={(key) =>
            handleMenuAction(fileInputRef, key.toString(), type)
          }
        >
          <DropdownItem
            key="upload"
            startContent={<UploadIcon className="size-4" />}
            className="rounded-md text-main-h data-[hover=true]:bg-gray-200 dark:text-main-dark-h dark:data-[hover=true]:bg-dark"
          >
            Subir foto de {type === "profile" ? "perfil" : "portada"}
          </DropdownItem>
          <DropdownItem
            key="delete"
            color="danger"
            startContent={<DeleteIcon className="size-4" />}
            className="rounded-md text-main-h data-[hover=true]:text-bittersweet-400 dark:text-main-dark-h dark:data-[hover=true]:text-cerise-red-600"
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

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
