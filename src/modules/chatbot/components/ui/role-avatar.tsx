import { Avatar } from "@nextui-org/react";
import Image from "next/image";

import { AvatarIcon } from "@/modules/icons/miscellaneus";

export const BotAvatar = () => {
  return (
    <div className="flex size-[25px] shrink-0 select-none items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-dark">
      <Image
        width={15}
        height={15}
        src="/logo-essentia.webp"
        alt="Avatar de Essentia AI"
        className="mr-px aspect-auto self-center object-cover object-center align-middle"
      />
    </div>
  );
};

export const UserAvatar = ({
  profileImage,
  username,
}: {
  profileImage?: string | null;
  username?: string;
}) => {
  return profileImage ? (
    <Image
      width={23}
      height={25}
      src={profileImage}
      alt={`Avatar de ${username}`}
      className="object-cover object-center"
    />
  ) : (
    <Avatar
      showFallback
      size="sm"
      icon={<AvatarIcon className="size-4" />}
      classNames={{
        icon: "text-main-m dark:text-main-dark-m",
        base: "bg-gray-300 dark:bg-gray-800 rounded-none",
        name: "font-medium text-main-h dark:text-main-dark-h",
      }}
    />
  );
};
