import React from "react";

import { UserProfileData } from "@/types/session";

import MainNavUser from "./main-nav-user";

interface AppFooterProps {
  user: UserProfileData | null;
  isCollapsed?: boolean;
}

const AppFooter = ({ user, isCollapsed }: AppFooterProps) => {
  return <MainNavUser user={user} isCollapsed={isCollapsed} />;
};

export default AppFooter;
