"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { UserProfileData } from "@/types/session";

import AccountStg from "./account-stg";

interface AccountSetttgWrpps {
  user: UserProfileData | null;
}

const AccountStgWrp = ({ user }: AccountSetttgWrpps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <AccountStg user={user} isMobile={isMobile} />;
};

export default AccountStgWrp;
