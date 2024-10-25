"use client";

import { Avatar, AvatarIcon } from "@nextui-org/react";
import Image from "next/image";

import { MenuIcon } from "@/modules/icons/common";
import { UserProfileData } from "@/types/session";

interface Props {
  profileData: UserProfileData | null;
}

const MenuButton: React.FC<Props> = ({ profileData }) => {
  const { profile_image } = profileData || {};

  return (
    <>
      {profileData ? (
        <>
          {profile_image ? (
            <div className="size-8 bg-white dark:bg-base-full-dark md:border-2 border-gray-200 dark:border-base-dark rounded-full overflow-hidden">
              <Image
                priority
                quality={50}
                width={32}
                height={32}
                src={profile_image}
                alt="Avatar del usuario"
                className="object-cover object-center rounded-full"
              />
            </div>
          ) : (
            <Avatar
              showFallback
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
      ) : (
        <MenuIcon className="size-6" />
      )}
    </>
  );
};

export default MenuButton;
