"use client";

import { MenuIcon } from "@/modules/icons/common";
import { UserProfileData } from "@/types/session";
import { Avatar, AvatarIcon, Button } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  profileData: UserProfileData | null;
}

const MenuButton: React.FC<Props> = ({ profileData }) => {
  return (
    <>
      {profileData ? (
        <>
          {profileData.profile_image ? (
            <div className="size-8 bg-white dark:bg-base-full-dark border-2 border-gray-200 dark:border-base-dark rounded-full overflow-hidden">
              <Image
                priority
                width={28}
                height={28}
                src={profileData.profile_image}
                alt="Avatar del usuario"
                className="object-cover object-center rounded-full"
              />
            </div>
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
      ) : (
        <MenuIcon className="size-6" />
      )}
    </>
  );
};

export default MenuButton;
