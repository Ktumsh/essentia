import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { AvatarIcon } from "@/components/ui/icons/miscellaneus";

export const BotAvatar = () => {
  return (
    <div className="dark:bg-logo flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white select-none">
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
    <div className="order-1 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-sm select-none">
      <Avatar className="size-6 rounded-sm">
        <AvatarImage src={profileImage || ""} alt={username} />
        <AvatarFallback className="rounded-sm">
          <AvatarIcon className="text-muted-foreground size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
