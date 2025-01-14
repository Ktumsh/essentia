import { Session } from "next-auth";
import React from "react";

import { UserProfileData } from "@/types/session";

import MainNavUser from "./main-nav-user";

interface AppFooterProps {
  session: Session | null;
  user: UserProfileData | null;
  isCollapsed?: boolean;
}

const AppFooter = ({ session, user, isCollapsed }: AppFooterProps) => {
  return (
    <MainNavUser session={session} user={user} isCollapsed={isCollapsed} />
  );
};

export default AppFooter;
