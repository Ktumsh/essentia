import React from "react";

import { UserProfileData } from "@/types/session";

import MainNavUser from "./main-nav-user";

interface AppFooterProps {
  user: UserProfileData | null;
}

const AppFooter = ({ user }: AppFooterProps) => {
  return <MainNavUser user={user} />;
};

export default AppFooter;
