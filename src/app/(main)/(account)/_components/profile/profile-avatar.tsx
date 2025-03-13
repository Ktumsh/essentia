"use client";

import Image from "next/image";
import { memo, RefObject, useRef } from "react";

import { Avatar, AvatarFallback } from "@/components/kit/avatar";
import { BetterTooltip } from "@/components/kit/tooltip";
import { AvatarIcon } from "@/components/ui/icons/miscellaneus";
import { UserProfileData } from "@/types/auth";

import { useProfileImagePreview } from "../../_hooks/use-profile-image-preview";
import { uploadFile } from "../../_lib/utils";

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
    <div className="group/avatar relative z-0 aspect-square size-20 rounded-full">
      {previewProfileImage ? (
        <Avatar className="border-border size-full border">
          <Image
            priority
            src={previewProfileImage}
            quality={100}
            width={80}
            height={80}
            alt={username}
            className="object-cover"
          />
        </Avatar>
      ) : (
        <Avatar className="border-border size-full border">
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
              className="absolute inset-0 rounded-full transition md:group-hover/avatar:bg-black/10"
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
