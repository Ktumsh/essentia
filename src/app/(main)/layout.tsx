import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import LayoutWrapper from "@/modules/core/components/ui/layout-wrapper";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await auth()) as Session;
  const userData = session ? await getUserProfileData(session) : null;

  return (
    <LayoutWrapper session={session} user={userData}>
      {children}
    </LayoutWrapper>
  );
}
