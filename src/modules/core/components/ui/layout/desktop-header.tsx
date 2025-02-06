"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModelSelector } from "@/modules/chatbot/components/ui/model-selector";
import { VisibilitySelector } from "@/modules/chatbot/components/visibility-selector";
import AppSidebarToggle from "@/modules/core/components/ui/sidebar/app-sidebar-toggle";
import { useChatContext } from "@/modules/core/hooks/use-chat-context";
import { UserProfileData } from "@/types/session";

import NavbarLinks from "./navbar-links";
import NotificationList from "./notifications-list";

interface DesktopHeaderProps {
  user: UserProfileData | null;
  selectedChatModel: string;
}

const DesktopHeader = ({ user, selectedChatModel }: DesktopHeaderProps) => {
  const { isReadonly, selectedVisibilityType } = useChatContext();

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const chatId = params.id;

  return (
    <>
      <header
        role="banner"
        className="sticky inset-x-0 top-0 z-50 hidden md:block"
      >
        <div className="dark:border-dark dark:bg-full-dark/80 flex h-14 w-full items-center justify-center border-b border-gray-200 bg-white/80 backdrop-blur-lg backdrop-saturate-150">
          <div className="absolute top-0 left-0 z-40">
            <div className="flex h-14 w-full items-center justify-center gap-5 px-4">
              <AppSidebarToggle />
              <Separator orientation="vertical" className="-ml-2.5 h-4" />
              <NavbarLinks />
            </div>
          </div>
          <div className="absolute top-0 right-0 z-40 h-14 px-6">
            <div className="dark:text-main-dark-h flex size-full items-center justify-center gap-4 text-sm font-normal text-gray-500">
              {!isReadonly && chatId && (
                <VisibilitySelector
                  chatId={chatId as string}
                  selectedVisibilityType={selectedVisibilityType || "private"}
                />
              )}

              {!isReadonly && (
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
