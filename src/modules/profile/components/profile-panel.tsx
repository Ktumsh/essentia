"use client";

import { FC, Key, useRef, useState, useTransition } from "react";
import Link from "next/link";
import ProfileInfo from "./profile-info";
import {
  Avatar,
  AvatarGroup,
  Button,
  Image as ImageUI,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import Image from "next/image";
import ProgressInfo from "./progress-info";
import { UserProfileData } from "@/types/session";
import { AddPhotoIcon, DeleteIcon, UploadIcon } from "@/modules/icons/action";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { calculateProfileProgress, deleteFile, uploadFile } from "../lib/utils";
import { SpinnerIcon } from "@/modules/icons/common";

interface ProfilePanelProps {
  profileData: UserProfileData;
}

const ProfilePanel: FC<ProfilePanelProps> = ({ profileData }) => {
  const { banner_image, id } = profileData;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(
    banner_image
  );
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const onProfileUpdate = (newBanner: string | null) => {
    setPreviewBanner(newBanner);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewBanner(reader.result as string);
        setShowSaveModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];

      startTransition(async () => {
        try {
          const bannerImage = await uploadFile(
            file,
            "banner",
            id,
            true,
            "Foto de portada actualizada exitosamente",
            "Hubo un error al subir tu foto de portada"
          );

          setPreviewBanner(bannerImage);
          setShowSaveModal(false);
        } catch (error) {
          startTransition(() => {});
          toast.error("Hubo un error al subir tu foto de portada");
        }
      });
    }
  };

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteFile(
          id,
          true,
          "Foto de portada eliminada",
          "Hubo un error al eliminar tu foto de portada"
        );

        setPreviewBanner(null);
        setShowDeleteModal(false);
      } catch (error) {
        startTransition(() => {});
        toast.error("Hubo un error al eliminar tu foto de portada");
      }
    });
  };

  const handleCancel = () => {
    setPreviewBanner(banner_image);
    setShowSaveModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMenuAction = (key: Key) => {
    const action = key.toString();
    switch (action) {
      case "upload":
        fileInputRef.current?.click();
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const progress = calculateProfileProgress(profileData);

  return (
    <>
      <section className="flex flex-col items-stretch shrink w-full mb-2">
        <div className="relative flex flex-col size-full bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark rounded-b-lg shadow-md">
          <div className="relative">
            {previewBanner ? (
              <Link
                href={`/profile/${profileData.username}/banner`}
                className="relative flex h-44 md:h-72 bg-black/30 transition-colors z-0 overflow-hidden"
              >
                <ImageUI
                  removeWrapper
                  as={Image}
                  width={984}
                  height={288}
                  quality={100}
                  priority
                  alt="Banner de perfil"
                  radius="none"
                  src={previewBanner}
                  classNames={{
                    img: "object-cover object-center !w-full !h-auto",
                  }}
                />
              </Link>
            ) : (
              <div
                aria-hidden="true"
                className="relative flex h-72 bg-black/30 transition-colors"
              ></div>
            )}

            <div className="flex items-center justify-center absolute right-0 bottom-0 m-5 opacity-75">
              <div className="relative flex items-center justify-center">
                <Dropdown
                  shouldBlockScroll={false}
                  classNames={{
                    content:
                      "p-1 bg-gradient-to-br from-white to-gray-100 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-lg",
                  }}
                >
                  <DropdownTrigger>
                    <Button
                      aria-label="Agregar foto de banner"
                      radius="full"
                      isIconOnly
                      className="bg-white/30 dark:bg-black/60 backdrop-blur-sm size-11"
                    >
                      <AddPhotoIcon className="size-5 text-gray-50" />
                    </Button>
                  </DropdownTrigger>

                  {previewBanner ? (
                    <DropdownMenu
                      aria-label="Opciones de banner"
                      variant="flat"
                      onAction={handleMenuAction}
                    >
                      <DropdownItem
                        key="upload"
                        startContent={<UploadIcon className="size-4" />}
                        className="rounded-md data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
                      >
                        Subir foto de portada
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        color="danger"
                        startContent={<DeleteIcon className="size-4" />}
                        className="rounded-md text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-bittersweet-400 dark:data-[hover=true]:text-cerise-red-600 !duration-150"
                      >
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu
                      aria-label="Opciones de banner"
                      variant="flat"
                      onAction={handleMenuAction}
                    >
                      <DropdownItem
                        key="upload"
                        startContent={<UploadIcon className="size-4" />}
                        className="rounded-md data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
                      >
                        Subir foto de portada
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </Dropdown>

                <input
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  type="file"
                  onChange={handleFileChange}
                  className="absolute size-[0.1px] opacity-0 pointer-events-auto bg-transparent"
                />
              </div>
            </div>
          </div>
          <ProfileInfo
            profileData={profileData}
            onProfileUpdate={onProfileUpdate}
          />
        </div>
      </section>
      <section className="flex items-stretch grow shrink size-full mb-5 gap-2">
        <div className="relative flex flex-col w-full bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark rounded-lg shadow-md"></div>
        <ProgressInfo progress={progress} profileData={profileData} />
      </section>

      {/* Modal para confirmación de guardado */}
      <Modal
        isOpen={showSaveModal}
        onOpenChange={handleCancel}
        placement="top"
        hideCloseButton
        scrollBehavior="inside"
        radius="sm"
        size="4xl"
        backdrop="transparent"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "absolute top-0 bg-white/30 dark:bg-base-full-dark-30 backdrop-blur backdrop-saturate-150 border border-white dark:border-base-full-dark",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent className="p-4 gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="inline-flex items-center text-white">
              <QuestionMarkCircledIcon className="size-4 mr-3" />
              <p className="text-sm ">
                ¿Deseas guardar la nueva foto de portada?
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                onPress={handleCancel}
                variant="bordered"
                className="text-white rounded-md border border-white dark:border-base-full-dark "
              >
                Cancelar
              </Button>
              <Button
                onPress={handleSave}
                color="danger"
                className="rounded-md"
                isDisabled={isPending}
                aria-disabled={isPending}
                startContent={
                  isPending ? (
                    <SpinnerIcon className="size-4 animate-spin" />
                  ) : null
                }
              >
                {isPending ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>

      {/* Modal para confirmación de eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        placement="center"
        hideCloseButton
        scrollBehavior="inside"
        radius="sm"
        size="sm"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "bg-white dark:bg-base-full-dark",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent className="p-6 gap-4">
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <h2 className="text-lg text-base-color dark:text-base-color-dark">
              ¿Deseas eliminar tu foto de portada?
            </h2>
            <p className="text-sm text-base-color-m dark:text-base-color-dark-h">
              No te preocupes, siempre puedes volver a subir una nueva foto.
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              onPress={() => setShowDeleteModal(false)}
              variant="bordered"
              className="rounded-md border border-gray-200 dark:border-base-dark data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark"
            >
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
              className="rounded-md"
              isDisabled={isPending}
              aria-disabled={isPending}
              startContent={
                isPending ? (
                  <SpinnerIcon className="size-4 animate-spin" />
                ) : null
              }
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePanel;
