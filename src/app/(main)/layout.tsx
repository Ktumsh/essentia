import LayoutWrapper from "@/modules/core/components/layout-wrapper";
import BottomNav from "@/modules/core/components/ui/bottom-navbar";
import ButtonUp from "@/modules/core/components/ui/button-up";
import Header from "@/modules/core/components/ui/header";
import MobileHeader from "@/modules/core/components/ui/mobile-header";

import { auth } from "@@/auth";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect("/bienvenida");
  }
  return (
    <>
      {/* Header */}
      <Header session={session} />
      {/* Mobile Header */}
      <MobileHeader session={session} />
      <LayoutWrapper session={session}>{children}</LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav />
      <ButtonUp />
    </>
  );
}
