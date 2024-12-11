"use client";

import { RefObject, useRef } from "react";
import { toast } from "sonner";

import { deleteFile } from "@/app/(main)/profile/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";

import ProfileImageDropdown from "./profile-image-dropdown";
import ProfileInfo from "./profile-info";
import { useProfileImagePreview } from "../hooks/use-profile-image-preview";
import { uploadFile } from "../lib/utils";

interface ProfilePanelProps {
  profileData: UserProfileData;
  isOwnProfile: boolean;
}

const ProfilePanel = ({ profileData, isOwnProfile }: ProfilePanelProps) => {
  const { id, username, profileImage } = profileData;

  const fileProfilePhotoRef = useRef<HTMLInputElement>(null);

  const { handleFilePreview, previewProfileImage, setPreviewProfileImage } =
    useProfileImagePreview(profileImage);

  const handleSave = async (file: File) => {
    const successMessage = "Foto de perfil actualizada";

    const errorMessage = "Hubo un error al subir tu foto de perfil";
    try {
      await uploadFile(file, id, true, successMessage, errorMessage);

      handleFilePreview(file);
    } catch {
      toast.error(errorMessage);
    }
  };

  const handleMenuAction = async (
    inputRef: RefObject<HTMLInputElement | null>,
    key: string,
  ) => {
    const successMessage = "Foto de perfil eliminada";

    const errorMessage = "Hubo un error al eliminar tu foto de perfil";

    switch (key) {
      case "upload":
        inputRef.current?.click();
        break;
      case "delete":
        toast.promise(deleteFile(id), {
          loading: "Eliminando foto de perfil...",
          success: async (result) => {
            if (result?.success) {
              setPreviewProfileImage(null);
              if (fileProfilePhotoRef.current) {
                fileProfilePhotoRef.current.value = "";
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
          <ProfileInfo profileData={profileData} isOwnProfile={isOwnProfile}>
            <div className="group relative z-0 aspect-square size-20 rounded-full">
              <Avatar className="size-full border border-gray-200 dark:border-dark">
                {previewProfileImage && (
                  <AvatarImage src={previewProfileImage} alt={username} />
                )}
                <AvatarFallback>
                  <AvatarIcon className="size-3/5" />
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full opacity-100 transition md:opacity-0 md:group-hover:bg-black/50 md:group-hover:opacity-75">
                  <div className="flex items-center justify-center">
                    <ProfileImageDropdown
                      fileInputRef={fileProfilePhotoRef}
                      hasImage={!!previewProfileImage}
                      handleMenuAction={handleMenuAction}
                      handleFileChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleSave(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </ProfileInfo>
        </div>
      </section>
    </>
  );
};

export default ProfilePanel;
