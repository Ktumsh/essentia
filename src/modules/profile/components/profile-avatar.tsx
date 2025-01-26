"use client";

import Image from "next/image";
import { memo, RefObject, useRef } from "react";

import { uploadFile } from "@/app/(main)/(account)/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BetterTooltip } from "@/components/ui/tooltip";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";

import { useProfileImagePreview } from "../hooks/use-profile-image-preview";

interface ProfileAvatarProps {
  user: UserProfileData | null;
  isOwnProfile: boolean;
}

const ProfileAvatar = ({ user, isOwnProfile }: ProfileAvatarProps) => {
  const { id, username, profileImage } = user!;

  const fileProfilePhotoRef = useRef<HTMLInputElement>(null);

  const { handleFilePreview, previewProfileImage } =
    useProfileImagePreview(profileImage);

  const handleSave = async (file: File) => {
    const resultMessage = await uploadFile(file, id);

    if (resultMessage === "Foto de perfil actualizada") {
      handleFilePreview(file);
    }
  };

  const handleMenuAction = async (
    inputRef: RefObject<HTMLInputElement | null>,
  ) => {
    inputRef.current?.click();
  };

  const labelProfileImage = "Editar foto de perfil";

  return (
    <div className="group relative z-0 aspect-square size-20 rounded-full">
      {previewProfileImage ? (
        <Avatar className="size-full border border-gray-200 dark:border-dark">
          <Image
            priority
            src={previewProfileImage}
            width={78}
            height={78}
            alt={username}
          />
        </Avatar>
      ) : (
        <Avatar className="size-full border border-gray-200 dark:border-dark">
          <AvatarFallback>
            <AvatarIcon className="size-3/5" />
          </AvatarFallback>
        </Avatar>
      )}
      {isOwnProfile && (
        <>
          <BetterTooltip content={labelProfileImage}>
            <button
              aria-label={labelProfileImage}
              className="absolute inset-0 rounded-full transition md:group-hover:bg-black/10"
              onClick={() => handleMenuAction(fileProfilePhotoRef)}
            >
              <span className="sr-only">{previewProfileImage}</span>
            </button>
          </BetterTooltip>

          <input
            ref={fileProfilePhotoRef}
            accept="image/jpeg,image/png,image/webp"
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleSave(e.target.files[0]);
              }
            }}
            className="sr-only"
          />
        </>
      )}
    </div>
  );
};

export default memo(ProfileAvatar);
