import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@/modules/icons/miscellaneus";

export const BotAvatar = () => {
  return (
    <div className="flex size-6 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-[#d5d8eb]">
      <Image
        width={16}
        height={16}
        src="/logo-essentia.webp"
        alt="Avatar de Essentia AI"
        className="aspect-auto object-cover object-center"
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
  return (
    <div className="order-1 flex size-6 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg">
      <Avatar className="size-6 rounded-lg">
        <AvatarImage src={profileImage || ""} alt={username} />
        <AvatarFallback className="rounded-lg">
          <AvatarIcon className="size-4 text-main-h dark:text-main-dark-h" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
