"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";

import { AddUserButton } from "@/components/button-kit/add-user-button";
import { LoginButton } from "@/components/button-kit/login-button";
import { Separator } from "@/components/kit/separator";
import { useChatContext } from "@/hooks/use-chat-context";
import useIsScrolled from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";


import FeedbackBox from "./feedback-box";
import NavbarLinks from "./navbar-links";
import NotificationList from "./notifications-list";
import { VisibilitySelector } from "./visibility-selector";
import AppSidebarToggle from "../sidebar/app-sidebar-toggle";

import type { UserProfileData } from "@/lib/types";

interface DesktopHeaderProps {
  user: UserProfileData | null;
  session: Session | null;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const DesktopHeader = ({ user, scrollRef }: DesktopHeaderProps) => {
  const { isReadonly, selectedVisibilityType } = useChatContext();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const isScrolled = useIsScrolled(scrollRef);

  const chatId = params.id;

  return (
    <>
      <header
        role="banner"
        className="@container/header sticky inset-x-0 top-0 z-50 hidden md:block"
      >
        <div
          className={cn(
            "bg-background/80 flex h-14 w-full items-center justify-center rounded-tl-2xl transition-all duration-300",
            {
              "shadow-little-pretty backdrop-blur-lg backdrop-saturate-150":
                isScrolled,
            },
          )}
        >
          <div className="absolute top-0 left-0 z-40">
            <div className="flex h-14 w-full items-center justify-center gap-5 px-4">
              <AppSidebarToggle />
              <Separator orientation="vertical" className="-ml-2.5 h-4!" />
              <NavbarLinks user={user} />
            </div>
          </div>
          <div className="absolute top-0 right-0 z-40 h-14 px-6">
            <div className="text-foreground/80 flex size-full items-center justify-center gap-3 pl-4 text-sm font-normal">
              <FeedbackBox />
              {!isReadonly && chatId && (
                <VisibilitySelector
                  chatId={chatId as string}
                  selectedVisibilityType={selectedVisibilityType || "private"}
                />
              )}

              {!user && (
                <>
                  <Separator orientation="vertical" className="h-4!" />
                  <LoginButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (pathname === "/") {
                        router.push("/login");
                      } else {
                        router.push(`/login?next=${pathname}`);
                      }
                    }}
                  >
                    Iniciar sesión
                  </LoginButton>
                  <AddUserButton
                    size="sm"
                    onClick={() => router.push("/register")}
                  >
                    Crear cuenta
                  </AddUserButton>
                </>
              )}
              {user && <NotificationList userId={user.id} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default DesktopHeader;
