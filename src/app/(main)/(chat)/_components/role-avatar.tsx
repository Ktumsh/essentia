import { AvatarIcon } from "@/components/icons/miscellaneus";
import FullLogo from "@/components/layout/full-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return <FullLogo className="size-6" />;
};

export const UserAvatar = ({
  profileImage,
  username,
}: {
  profileImage?: string | null;
  username?: string;
}) => {
  return (
    <div className="order-1 flex size-6 shrink-0 items-center justify-center select-none">
      <Avatar className="size-6">
        <AvatarImage src={profileImage || ""} alt={username} />
        <AvatarFallback>
          <AvatarIcon className="text-muted-foreground size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
