"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { UserProfileData } from "@/types/session";

import AccountSettings from "./account-settings";

interface AccountSettingsWrapperProps {
  user: UserProfileData | null;
}

const AccountSettingsWrapper = ({ user }: AccountSettingsWrapperProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <AccountSettings user={user} isMobile={isMobile} />;
};

export default AccountSettingsWrapper;
