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
            <div className="size-8 overflow-hidden rounded-full border-gray-200 bg-white dark:border-dark dark:bg-full-dark md:border-2">
              <Image
                priority
                quality={50}
                width={32}
                height={32}
                src={profile_image}
                alt="Avatar del usuario"
                className="rounded-full object-cover object-center"
              />
            </div>
          ) : (
            <Avatar
              showFallback
              size="sm"
              icon={<AvatarIcon />}
              classNames={{
                icon: "text-main-m dark:text-main-dark-m size-[80%]",
                base: "bg-gray-300 dark:bg-gray-600",
                name: "font-medium text-main-h dark:text-main-dark-h",
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
