"use client";

import { LockKeyholeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { GripButton } from "@/components/button-kit/grip-button";
import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { BetterTooltip } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site.config";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/utils";

const ChatHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isMobile, setOpenMobile } = useSidebar();

  const { isTrialUsed } = useTrial();
  const { subscription } = useUserSubscription();

  const isPremium = subscription?.plan?.id === siteConfig.plan.premium;
  const isPremiumPlus = subscription?.plan?.id === siteConfig.plan.premiumPlus;

  return (
    <>
      <SidebarGroup>
        {!isMobile && (
          <SidebarHeader className="mb-1">
            <div className="flex-1 text-center text-sm leading-tight">
              <h4 className="font-merriweather truncate font-semibold">
                Historial de chats
              </h4>
            </div>
          </SidebarHeader>
        )}
        <SidebarMenu className="mb-2 gap-2">
          {!isPremiumPlus && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <UpgradeButton
                  variant="gradient"
                  onClick={() => {
                    setOpen(true);
                  }}
                  className={cn(
                    "hover:text-white data-[active=true]:text-white",
                    isPremium && !isPremiumPlus && "bg-premium-plus!",
                  )}
                >
                  Mejorar plan
                </UpgradeButton>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Nuevo chat"
              isActive
              onClick={() => {
                router.push("/aeris");
                router.refresh();
                setOpenMobile(false);
              }}
              className="dark:data-[active=true]:bg-accent/50 dark:border-alternative/50 dark:hover:data-[active=true]:bg-accent/50 justify-center border text-sm focus-visible:outline-hidden data-[active=true]:bg-slate-50 data-[active=true]:hover:bg-slate-50"
            >
              <span>Nuevo chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              disabled={!isPremiumPlus}
              isActive={pathname === "/aeris/progreso"}
            >
              <GripButton
                variant="ghost"
                onClick={() => router.push("/aeris/progreso")}
                className="hover:bg-accent hover:text-foreground data-[active=true]:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:dark:border-alternative/50 relative justify-start font-normal data-[active=true]:border-0 data-[active=true]:shadow-none"
              >
                Hábitos y progreso
                {!isPremiumPlus && (
                  <BetterTooltip content="Disponible con Premium Plus">
                    <LockKeyholeIcon
                      onClick={(e) => e.stopPropagation()}
                      className="pointer-events-auto! absolute inset-y-0 right-3 z-1 my-auto cursor-default"
                    />
                  </BetterTooltip>
                )}
              </GripButton>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {!isPremiumPlus && (
        <PaymentModal
          isOpen={open}
          setIsOpen={setOpen}
          featureType={
            isPremium && !isPremiumPlus ? "habits-and-progress" : "chat"
          }
          mode={!isTrialUsed && !isPremium ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default ChatHeader;
