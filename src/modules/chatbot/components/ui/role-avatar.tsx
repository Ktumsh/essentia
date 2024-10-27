import { Avatar } from "@nextui-org/react";
import Image from "next/image";

import { AvatarIcon } from "@/modules/icons/miscellaneus";

export const BotAvatar = () => {
  return (
    <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg bg-white dark:bg-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
      <Image
        width={15}
        height={15}
        src="/logo-essentia.webp"
        alt="Avatar de Essentia AI"
        className="object-cover object-center aspect-auto self-center align-middle mr-px"
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
