"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { VisibilitySelector } from "@/modules/chatbot/components/visibility-selector";
import AppSidebarToggle from "@/modules/core/components/ui/sidebar/app-sidebar-toggle";
import { useChatContext } from "@/modules/core/hooks/use-chat-context";
import { UserProfileData } from "@/types/session";
import { formatPathName } from "@/utils/format";

import NavbarLinks from "./navbar-links";

interface DesktopHeaderProps {
  user: UserProfileData | null;
}

const DesktopHeader = ({ user }: DesktopHeaderProps) => {
  const { isReadonly, selectedVisibilityType } = useChatContext();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const chatId = params.id;

  const normalizedPath = formatPathName(pathname);

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.href ||
      normalizedPath.startsWith(page.href + "/"),
  }));

  return (
    <>
      <header
        role="banner"
        className="sticky inset-x-0 top-0 z-50 hidden md:block"
      >
        <nav className="flex h-auto max-h-14 w-full items-center justify-center border-b border-gray-200 bg-white/80 backdrop-blur-lg backdrop-saturate-150 dark:border-dark dark:bg-full-dark/80">
          <div className="relative flex h-14 w-full max-w-screen-sm flex-row flex-nowrap items-center justify-center gap-4 px-6">
            <NavbarLinks pages={pages} />
          </div>
        </nav>
        <div className="absolute left-0 top-0 z-40">
          <div className="flex h-14 w-full items-center justify-center gap-5 px-4">
            <AppSidebarToggle />
            {!isReadonly && chatId && (
              <VisibilitySelector
                chatId={chatId as string}
                selectedVisibilityType={selectedVisibilityType || "private"}
                className="order-1 md:order-3"
              />
            )}
          </div>
        </div>
        <div className="absolute right-0 top-0 z-40 h-14 px-6">
          <div className="flex size-full items-center justify-center text-sm font-normal text-gray-500 dark:text-main-dark-h">
            {!user && (
              <Button variant="gradient" onClick={() => router.push("/login")}>
                Inicia sesión
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default DesktopHeader;
