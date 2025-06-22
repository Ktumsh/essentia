"use client";

import { useIsMobile } from "@/hooks/use-mobile";

import AccountStg from "./account-stg";

const AccountStgWrp = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <AccountStg isMobile={isMobile} />;
};

export default AccountStgWrp;
