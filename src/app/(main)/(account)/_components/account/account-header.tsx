"use client";

import { usePathname } from "next/navigation";

interface AccountHeaderProps {
  username?: string;
}

const AccountHeader = ({ username }: AccountHeaderProps) => {
  const pathname = usePathname();

  const isAccount = pathname === "/account";
  const isProfile = pathname === "/profile";
  const isProfiles = pathname.startsWith("/profiles");

  return (
    <h1 className="font-merriweather py-4 text-2xl leading-none font-semibold sm:text-3xl md:pt-11 dark:text-white">
      {(isAccount && "Mi cuenta") ||
        (isProfile && "Mi perfil") ||
        (isProfiles && "Perfil de " + username) ||
        "Mi suscripción"}
    </h1>
  );
};

export default AccountHeader;
