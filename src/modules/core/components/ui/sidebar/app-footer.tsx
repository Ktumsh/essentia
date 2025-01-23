import { Session } from "next-auth";
import React from "react";

import { UserProfileData } from "@/types/session";

import ChatFooter from "./chat-footer";
import MainNavUser from "./main-nav-user";

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
        <ChatFooter isMobile={isMobile} />
      ) : (
        <MainNavUser session={session} user={user} isCollapsed={isCollapsed} />
      )}
    </>
  );
};

export default AppFooter;
