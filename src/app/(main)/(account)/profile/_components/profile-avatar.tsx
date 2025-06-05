"use client";

import Image from "next/image";
import { memo, RefObject, useRef, useState } from "react";
import { toast } from "sonner";

import { AvatarIcon } from "@/components/icons/miscellaneus";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BetterTooltip } from "@/components/ui/tooltip";

import EditAvatarModal from "./edit-avatar-modal";
import { useProfileImagePreview } from "../../_hooks/use-profile-image-preview";
import { uploadFile } from "../../_lib/utils";

import type { UserProfileData } from "@/lib/types";

interface ProfileAvatarProps {
  user: UserProfileData | null;
  isOwnProfile: boolean;
}

const ProfileAvatar = ({ user, isOwnProfile }: ProfileAvatarProps) => {
  const { id, username, profileImage } = user!;

  const fileProfilePhotoRef = useRef<HTMLInputElement>(null);
  const { handleFilePreview, previewProfileImage } =
    useProfileImagePreview(profileImage);

  const [tempImage, setTempImage] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);

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

  const resetTempImage = () => {
    setTempImage(null);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imageElement = new window.Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.onload = (e) => {
        const { naturalWidth, naturalHeight } = e.target as HTMLImageElement;
        if (naturalWidth < 150 || naturalHeight < 150) {
          toast.error("La imagen debe ser de al menos 150 x 150 píxeles");
          return resetTempImage();
        }
        setTempImage(imageUrl);
        setShowCropModal(true);
      };
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="group/avatar relative z-0 aspect-square size-20">
      {previewProfileImage ? (
        <Avatar className="size-full border">
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
        <Avatar className="size-full border">
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
              className="mask mask-squircle absolute inset-0 transition md:group-hover/avatar:bg-black/10"
              onClick={() => handleMenuAction(fileProfilePhotoRef)}
            >
              <span className="sr-only">{previewProfileImage}</span>
            </button>
          </BetterTooltip>
          <input
            ref={fileProfilePhotoRef}
            accept="image/jpeg,image/png,image/webp"
            type="file"
            onChange={handleChangeFile}
            className="sr-only"
          />
        </>
      )}
      <EditAvatarModal
        imageSrc={tempImage!}
        open={showCropModal}
        setIsOpen={setShowCropModal}
        onCropComplete={handleSave}
      />
    </div>
  );
};

export default memo(ProfileAvatar);
