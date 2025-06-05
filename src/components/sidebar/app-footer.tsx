import { Session } from "next-auth";
import React from "react";


import ChatFooter from "./chat-footer";
import MainNavUser from "./main-nav-user";

import type { UserProfileData } from "@/lib/types";

interface AppFooterProps {
  session: Session | null;
  user: UserProfileData | null;
  isCollapsed?: boolean;
  isMobile: boolean;
}

const AppFooter = ({
  session,
  user,
  isCollapsed,
  isMobile,
}: AppFooterProps) => {
  return (
    <>
      {isMobile ? (
        <ChatFooter isMobile={isMobile} isPremium={user?.isPremium ?? false} />
      ) : (
        <MainNavUser session={session} user={user} isCollapsed={isCollapsed} />
      )}
    </>
  );
};

export default AppFooter;
