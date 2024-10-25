"use client";

import {
  Button,
  Image as ImageUI,
  Modal,
  ModalContent,
  Avatar,
} from "@nextui-org/react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC, RefObject, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteFile } from "@/app/(main)/profile/actions";
import { SpinnerIcon } from "@/modules/icons/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";

import ProfileImageDropdown from "./profile-image-dropdown";
import ProfileInfo from "./profile-info";
import { useProfileForm } from "../hooks/use-profile-form";
import { uploadFile } from "../lib/utils";

interface ProfilePanelProps {
  profileData: UserProfileData;
  isOwnProfile: boolean;
}

const ProfilePanel: FC<ProfilePanelProps> = ({ profileData, isOwnProfile }) => {
  const { username, id } = profileData;

  const fileProfilePhotoRef = useRef<HTMLInputElement>(null);
  const fileBannerPhotoRef = useRef<HTMLInputElement>(null);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"banner" | "profile">("banner");

  const [isPending, startTransition] = useTransition();

  const {
    handleFileChange,
    handleFilePreview,
    previewProfileImage,
    previewBannerImage,
    resetPreviewsImages,
    setPreviewProfileImage,
    setPreviewBannerImage,
  } = useProfileForm(profileData);

  const handleSave = async () => {
    const fileInput =
      modalType === "banner" ? fileBannerPhotoRef : fileProfilePhotoRef;
    if (fileInput.current?.files && fileInput.current.files[0]) {
      const file = fileInput.current.files[0];

      startTransition(async () => {
        try {
          await uploadFile(
            file,
            modalType,
            id,
            true,
            `${
              modalType === "banner" ? "Foto de portada" : "Foto de perfil"
            } actualizada`,
            `Hubo un error al subir tu ${
              modalType === "banner" ? "foto de portada" : "foto de perfil"
            }`
          );

          if (modalType === "banner") {
            handleFilePreview(file, "banner");
          } else {
            handleFilePreview(file, "profile");
          }

          setShowSaveModal(false);
        } catch {
          toast.error(
            `Hubo un error al subir tu ${
              modalType === "banner" ? "foto de portada" : "foto de perfil"
            }`
          );
        }
      });
    }
  };

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deleteFile(id, modalType);

        if (result?.success) {
          toast.success(
            `${
              modalType === "banner" ? "Foto de portada" : "Foto de perfil"
            } eliminada`
          );

          if (modalType === "profile") {
            setPreviewProfileImage(null);
            if (fileProfilePhotoRef.current) {
              fileProfilePhotoRef.current.value = "";
            }
          } else {
            setPreviewBannerImage(null);
            if (fileBannerPhotoRef.current) {
              fileBannerPhotoRef.current.value = "";
            }
          }

          setShowDeleteModal(false);
        } else {
          toast.error(
            `Hubo un error al eliminar tu ${
              modalType === "banner" ? "foto de portada" : "foto de perfil"
            }`
          );
        }
      } catch {
        toast.error(
          `Hubo un error al eliminar tu ${
            modalType === "banner" ? "foto de portada" : "foto de perfil"
          }`
        );
      }
    });
  };
  const handleCancel = () => {
    resetPreviewsImages();
    setShowSaveModal(false);
    setShowDeleteModal(false);
    const fileInput =
      modalType === "banner" ? fileBannerPhotoRef : fileProfilePhotoRef;
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleMenuAction = (
    inputRef: RefObject<HTMLInputElement>,
    key: string,
    type: "banner" | "profile"
  ) => {
    setModalType(type);

    switch (key) {
      case "upload":
        inputRef.current?.click();
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section className="flex flex-col items-stretch shrink w-full">
        <div className="relative flex flex-col min-h-[calc(100dvh-112px)] md:min-h-[calc(100dvh-56px)] bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark">
          <div className="group relative">
            {previewBannerImage ? (
              <Link
                href={`/profile/${profileData.username}/banner`}
                className="relative flex h-44 md:h-60 bg-black/30 transition-colors z-0 overflow-hidden"
              >
                <ImageUI
                  removeWrapper
                  as={Image}
                  width={984}
                  height={240}
                  quality={100}
                  priority
                  alt="Banner de perfil"
                  radius="none"
                  src={previewBannerImage}
                  classNames={{
                    img: "object-cover object-center !w-full !h-auto",
                  }}
                />
              </Link>
            ) : (
              <div
                aria-hidden="true"
                className="relative flex h-44 md:h-60 bg-black/30 transition-colors"
              ></div>
            )}

            {isOwnProfile && (
              <div className="flex items-center justify-center absolute right-0 bottom-0 m-5 opacity-75 md:opacity-0 group-hover:opacity-75 transition-opacity">
                <div className="relative flex items-center justify-center">
                  <ProfileImageDropdown
                    type="banner"
                    fileInputRef={fileBannerPhotoRef}
                    handleMenuAction={handleMenuAction}
                    handleFileChange={(e) => {
                      handleFileChange(e, "banner");
                      if (e.target.files?.[0]) {
                        handleFilePreview(e.target.files[0], "banner");
                        setShowSaveModal(true);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <ProfileInfo profileData={profileData} isOwnProfile={isOwnProfile}>
            {/* Avatar */}
            <div className="group absolute -top-9 md:-top-14 left-0 md:left-6">
              <div className="z-0 size-full bg-gray-200 dark:bg-base-dark border-5 border-white dark:border-base-full-dark rounded-full overflow-hidden">
                {previewProfileImage ? (
                  <Link
                    href={`/profile/${username}/photo`}
                    className="relative flex shrink-0 overflow-hidden rounded-full size-20 md:size-32"
                  >
                    <Image
                      width={120}
                      height={120}
                      priority
                      src={previewProfileImage || ""}
                      alt="Abrir foto"
                      className="aspect-square size-full"
                    />
                  </Link>
                ) : (
                  <div className="relative flex shrink-0 overflow-hidden rounded-full size-20 md:size-32">
                    <Avatar
                      showFallback
                      icon={<AvatarIcon className="size-3/5" />}
                      classNames={{
                        icon: "text-base-color-m dark:text-base-color-dark-m",
                        base: "bg-gray-300 dark:bg-gray-600 !size-full",
                        name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                      }}
                    />
                  </div>
                )}
                {isOwnProfile && (
                  <div className="flex items-center justify-center absolute inset-[5px] rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-75 md:group-hover:bg-black/50 transition pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <ProfileImageDropdown
                        type="profile"
                        fileInputRef={fileProfilePhotoRef}
                        handleMenuAction={handleMenuAction}
                        handleFileChange={(e) => {
                          handleFileChange(e, "profile");
                          if (e.target.files?.[0]) {
                            handleFilePreview(e.target.files[0], "profile");
                            setShowSaveModal(true);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ProfileInfo>
        </div>
      </section>

      {/* Modales para confirmación de guardado y eliminación */}
      {isOwnProfile && (
        <>
          <Modal
            isOpen={showSaveModal}
            onOpenChange={handleCancel}
            hideCloseButton
            scrollBehavior="inside"
            radius="sm"
            size="4xl"
            backdrop="transparent"
            classNames={{
              backdrop: "z-[101] bg-black/80",
              wrapper: "z-[102]",
              base: "absolute bottom-0 md:bottom-auto md:top-0 bg-white dark:bg-base-full-dark md:bg-white/30 md:dark:bg-base-full-dark-30 backdrop-blur backdrop-saturate-150 border border-white dark:border-base-full-dark",
              closeButton:
                "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
            }}
          >
            <ModalContent className="p-4 gap-4">
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center text-base-color md:text-white dark:text-white">
                  <QuestionMarkCircledIcon className="size-4 mr-3" />
                  <p className="text-sm">
                    {`¿Deseas guardar la nueva foto de ${
                      modalType === "banner" ? "portada" : "perfil"
                    }?`}
                  </p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2">
                  <Button
                    onPress={handleCancel}
                    variant="bordered"
                    className="text-base-color md:text-white dark:text-white rounded-md border border-gray-200 md:border-white dark:border-base-dark md:dark:border-base-full-dark "
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
                  {`¿Deseas eliminar tu foto de ${
                    modalType === "banner" ? "portada" : "perfil"
                  }?`}
                </h2>
                <p className="text-sm text-base-color-m dark:text-base-color-dark-h">
                  No te preocupes, siempre puedes volver a subir una nueva foto.
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2">
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
      )}
    </>
  );
};

export default ProfilePanel;
