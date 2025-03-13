"use client";

import { LogIn } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";

import { Button } from "@/components/kit/button";
import { Separator } from "@/components/kit/separator";
import { useChatContext } from "@/hooks/use-chat-context";
import { UserProfileData } from "@/types/auth";

import { ModelSelector } from "./model-selector";
import NavbarLinks from "./navbar-links";
import NotificationList from "./notifications-list";
import { VisibilitySelector } from "./visibility-selector";
import AppSidebarToggle from "../sidebar/app-sidebar-toggle";

interface DesktopHeaderProps {
  user: UserProfileData | null;
  selectedChatModel: string;
  session: Session | null;
}

const DesktopHeader = ({
  user,
  selectedChatModel,
  session,
}: DesktopHeaderProps) => {
  const { isReadonly, selectedVisibilityType } = useChatContext();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const chatId = params.id;

  const isAIPage = pathname.startsWith("/essentia-ai");

  const isPremium = user?.isPremium ?? false;

  return (
    <>
      <header
        role="banner"
        className="sticky inset-x-0 top-0 z-50 hidden md:block"
      >
        <div className="border-border bg-background/80 flex h-14 w-full items-center justify-center rounded-tl-2xl border-b backdrop-blur-lg backdrop-saturate-150">
          <div className="absolute top-0 left-0 z-40">
            <div className="flex h-14 w-full items-center justify-center gap-5 px-4">
              <AppSidebarToggle />
              <Separator orientation="vertical" className="-ml-2.5 h-4!" />
              <NavbarLinks user={user} />
            </div>
          </div>
          <div className="absolute top-0 right-0 z-40 h-14 px-6">
            <div className="dark:text-main-dark-h flex size-full items-center justify-center gap-4 text-sm font-normal text-slate-500">
              {!isReadonly && chatId && (
                <VisibilitySelector
                  chatId={chatId as string}
                  selectedVisibilityType={selectedVisibilityType || "private"}
                />
              )}

              {!isReadonly && isAIPage && session && isPremium && (
                <ModelSelector selectedModelId={selectedChatModel} />
              )}
              {!user && (
                <Button
                  variant="gradient"
                  onClick={() => {
                    if (pathname === "/") {
                      router.push("/login");
                    } else {
                      router.push(`/login?redirect=${pathname}`);
                    }
                  }}
                >
                  <LogIn
                    aria-hidden="true"
                    className="size-4 **:fill-white focus:outline-hidden"
                  />
                  Inicia sesión
                </Button>
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
