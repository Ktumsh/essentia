"use client";

import { UserProfileData } from "@/types/session";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  profileData: UserProfileData | null;
}

const MenuButton: React.FC<Props> = ({ profileData }) => {
  return (
    <>
      {profileData?.image ? (
        <Image
          width={32}
          height={32}
          src={profileData.image}
          alt="Avatar del usuario"
        />
      ) : (
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          size="sm"
          icon={<AvatarIcon />}
          classNames={{
            icon: "text-base-color-m dark:text-base-color-dark-m size-[80%]",
            base: "bg-gray-300 dark:bg-gray-600",
            name: "font-medium text-base-color-h dark:text-base-color-dark-h",
          }}
        />
      )}
    </>
  );
};

export default MenuButton;
