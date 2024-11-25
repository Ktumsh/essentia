"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, RefObject, useRef } from "react";
import { toast } from "sonner";

import { deleteFile } from "@/app/(main)/profile/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  const {
    handleFilePreview,
    previewProfileImage,
    previewBannerImage,
    setPreviewProfileImage,
    setPreviewBannerImage,
  } = useProfileForm(profileData);

  const handleSave = async (file: File, type: "banner" | "profile") => {
    const isBanner = type === "banner";

    const successMessage = `${
      isBanner ? "Foto de portada" : "Foto de perfil"
    } actualizada`;

    const errorMessage = `Hubo un error al subir tu ${
      isBanner ? "foto de portada" : "foto de perfil"
    }`;
    try {
      await uploadFile(file, type, id, true, successMessage, errorMessage);

      if (isBanner) {
        handleFilePreview(file, "banner");
      } else {
        handleFilePreview(file, "profile");
      }
    } catch {
      toast.error(errorMessage);
    }
  };

  const handleMenuAction = async (
    inputRef: RefObject<HTMLInputElement | null>,
    key: string,
    type: "banner" | "profile",
  ) => {
    const isBanner = type === "banner";

    const successMessage = `${
      isBanner ? "Foto de portada" : "Foto de perfil"
    } eliminada`;

    const errorMessage = `Hubo un error al eliminar tu ${
      isBanner ? "foto de portada" : "foto de perfil"
    }`;

    switch (key) {
      case "upload":
        inputRef.current?.click();
        break;
      case "delete":
        toast.promise(deleteFile(id, type), {
          loading: `Eliminando ${isBanner ? "foto de portada" : "foto de perfil"}...`,
          success: async (result) => {
            if (result?.success) {
              if (type === "profile") {
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
              return successMessage;
            } else {
              throw new Error(errorMessage);
            }
          },
          error: errorMessage,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section className="flex w-full flex-col overflow-hidden pb-16 md:pb-0">
        <div className="mx-auto size-full min-h-[calc(100dvh-120px)] max-w-7xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:min-h-[calc(100dvh-56px)] md:border md:border-y-0">
          <div className="group relative">
            {previewBannerImage ? (
              <Link
                href={`/profile/${profileData.username}/banner`}
                className="relative z-0 flex aspect-[393/128] max-h-72 w-full overflow-hidden bg-black/30 transition-colors"
              >
                <Image
                  width={1278}
                  height={288}
                  quality={100}
                  priority
                  alt="Banner de perfil"
                  src={previewBannerImage}
                  className="h-auto object-cover object-center"
                />
              </Link>
            ) : (
              <div
                aria-hidden="true"
                className="relative flex aspect-[393/128] max-h-72 w-full bg-black/30 transition-colors"
              ></div>
            )}

            {isOwnProfile && (
              <div className="absolute bottom-0 right-0 m-5 flex items-center justify-center opacity-75 transition-opacity group-hover:opacity-75 md:opacity-0">
                <div className="relative flex items-center justify-center">
                  <ProfileImageDropdown
                    type="banner"
                    fileInputRef={fileBannerPhotoRef}
                    hasImage={!!previewBannerImage}
                    handleMenuAction={handleMenuAction}
                    handleFileChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleSave(e.target.files[0], "banner");
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <ProfileInfo profileData={profileData} isOwnProfile={isOwnProfile}>
            <div className="group absolute -top-9 left-0 md:-top-14 md:left-6">
              <div className="z-0 overflow-hidden rounded-full border-5 border-white bg-gray-200 dark:border-full-dark dark:bg-dark">
                <Avatar className="relative flex aspect-square size-20 shrink-0 overflow-hidden rounded-full md:size-32">
                  {previewProfileImage && (
                    <AvatarImage src={previewProfileImage} alt={username} />
                  )}
                  <AvatarFallback>
                    <AvatarIcon className="size-3/5" />
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <div className="pointer-events-none absolute inset-[5px] flex items-center justify-center rounded-full opacity-100 transition md:opacity-0 md:group-hover:bg-black/50 md:group-hover:opacity-75">
                    <div className="relative flex items-center justify-center">
                      <ProfileImageDropdown
                        type="profile"
                        fileInputRef={fileProfilePhotoRef}
                        hasImage={!!previewProfileImage}
                        handleMenuAction={handleMenuAction}
                        handleFileChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleSave(e.target.files[0], "profile");
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
    </>
  );
};

export default ProfilePanel;
