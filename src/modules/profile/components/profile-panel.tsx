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
            }`,
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
            }`,
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
            } eliminada`,
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
            }`,
          );
        }
      } catch {
        toast.error(
          `Hubo un error al eliminar tu ${
            modalType === "banner" ? "foto de portada" : "foto de perfil"
          }`,
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
    inputRef: RefObject<HTMLInputElement | null>,
    key: string,
    type: "banner" | "profile",
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
      <section className="flex w-full shrink flex-col items-stretch">
        <div className="relative flex min-h-[calc(100dvh-112px)] flex-col border-gray-200 bg-white dark:border-dark dark:bg-full-dark md:min-h-[calc(100dvh-56px)] md:border">
          <div className="group relative">
            {previewBannerImage ? (
              <Link
                href={`/profile/${profileData.username}/banner`}
                className="relative z-0 flex h-44 overflow-hidden bg-black/30 transition-colors md:h-60"
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
                className="relative flex h-44 bg-black/30 transition-colors md:h-60"
              ></div>
            )}

            {isOwnProfile && (
              <div className="absolute bottom-0 right-0 m-5 flex items-center justify-center opacity-75 transition-opacity group-hover:opacity-75 md:opacity-0">
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
            <div className="group absolute -top-9 left-0 md:-top-14 md:left-6">
              <div className="z-0 size-full overflow-hidden rounded-full border-5 border-white bg-gray-200 dark:border-full-dark dark:bg-dark">
                {previewProfileImage ? (
                  <Link
                    href={`/profile/${username}/photo`}
                    className="relative flex size-20 shrink-0 overflow-hidden rounded-full md:size-32"
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
                  <div className="relative flex size-20 shrink-0 overflow-hidden rounded-full md:size-32">
                    <Avatar
                      showFallback
                      icon={<AvatarIcon className="size-3/5" />}
                      classNames={{
                        icon: "text-main-m dark:text-main-dark-m",
                        base: "bg-gray-300 dark:bg-gray-600 !size-full",
                        name: "font-medium text-main-h dark:text-main-dark-h",
                      }}
                    />
                  </div>
                )}
                {isOwnProfile && (
                  <div className="pointer-events-none absolute inset-[5px] flex items-center justify-center rounded-full opacity-100 transition md:opacity-0 md:group-hover:bg-black/50 md:group-hover:opacity-75">
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
              base: "absolute bottom-0 md:bottom-auto md:top-0 bg-white dark:bg-full-dark md:bg-white/30 md:dark:bg-full-dark/30 backdrop-blur backdrop-saturate-150 border border-white dark:border-full-dark",
              closeButton:
                "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
            }}
          >
            <ModalContent className="gap-4 p-4">
              <div className="flex w-full items-center justify-between">
                <div className="inline-flex items-center text-main dark:text-white md:text-white">
                  <QuestionMarkCircledIcon className="mr-3 size-4" />
                  <p className="text-sm">
                    {`¿Deseas guardar la nueva foto de ${
                      modalType === "banner" ? "portada" : "perfil"
                    }?`}
                  </p>
                </div>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                  <Button
                    onPress={handleCancel}
                    variant="bordered"
                    className="rounded-md border border-gray-200 text-main dark:border-dark dark:text-white md:border-white md:text-white md:dark:border-full-dark"
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
              base: "bg-white dark:bg-full-dark",
              closeButton:
                "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
            }}
          >
            <ModalContent className="gap-4 p-6">
              <div className="flex flex-col space-y-2 text-center sm:text-left">
                <h2 className="text-lg text-main dark:text-main-dark">
                  {`¿Deseas eliminar tu foto de ${
                    modalType === "banner" ? "portada" : "perfil"
                  }?`}
                </h2>
                <p className="text-sm text-main-m dark:text-main-dark-h">
                  No te preocupes, siempre puedes volver a subir una nueva foto.
                </p>
              </div>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                <Button
                  onPress={() => setShowDeleteModal(false)}
                  variant="bordered"
                  className="rounded-md border border-gray-200 data-[hover=true]:bg-gray-200 dark:border-dark dark:data-[hover=true]:bg-dark"
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
