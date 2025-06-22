import AccountStgWrp from "./_components/account-stg-wrp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración / Cuenta y perfil",
  alternates: {
    canonical: "/settings/account-profile",
  },
};

export default function AccountStgPage() {
  return <AccountStgWrp />;
}
