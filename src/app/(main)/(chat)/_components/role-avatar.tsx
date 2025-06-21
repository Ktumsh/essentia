"use client";

import { AvatarIcon } from "@/components/icons/miscellaneus";
import AerisLogo from "@/components/layout/aeris-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BetterTooltip } from "@/components/ui/tooltip";
import { useChatContext } from "@/hooks/use-chat-context";

export const BotAvatar = () => {
  return (
    <BetterTooltip content="Aeris" side="left">
      <div className="grid aspect-square size-6 place-content-center">
        <AerisLogo width={24} height={24} className="h-6" />
      </div>
    </BetterTooltip>
  );
};

export const UserAvatar = ({
  profileImage,
  username,
}: {
  profileImage?: string | null;
  username?: string;
}) => {
  const { isReadonly } = useChatContext();
  return (
    <BetterTooltip
      content={isReadonly ? username || "Usuario" : "Tú"}
      side="right"
    >
      <div className="order-1 flex size-6 shrink-0 items-center justify-center select-none">
        <Avatar className="size-6">
          <AvatarImage src={profileImage || ""} alt={username} />
          <AvatarFallback>
            <AvatarIcon className="text-muted-foreground size-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </BetterTooltip>
  );
};
