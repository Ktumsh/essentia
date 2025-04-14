import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { AvatarIcon } from "@/components/ui/icons/miscellaneus";
import Logo from "@/components/ui/layout/logo";

export const BotAvatar = () => {
  return (
    <div className="bg-logo flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-sm select-none">
      <Logo />
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
