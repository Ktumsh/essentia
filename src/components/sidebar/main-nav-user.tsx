import {
  BadgeInfo,
  ChevronsUpDown,
  LogOut,
  Sparkles,
  SunMoon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { AvatarIcon } from "@/components/icons/miscellaneus";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navConfig } from "@/config/nav.config";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/utils";

import ThemeToggle from "../layout/theme-toggle";

import type { UserProfileData } from "@/lib/types";

interface MainNavUserProps {
  session: Session | null;
  user: UserProfileData | null;
  isCollapsed?: boolean;
}

const MainNavUser = ({ session, user, isCollapsed }: MainNavUserProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const { isTrialActive, isTrialUsed } = useTrial();

  const { subscription } = useUserSubscription();

  const fullName = `${firstName} ${lastName}`;

  const subscriptionPlan = subscription?.plan;

  const menuLinks = navConfig.menuFooterLinks;

  return (
    <>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  data-testid="user-nav-button"
                  size="lg"
                  tooltip="Perfil"
                  isActive
                  className={cn(
                    "h-auto gap-2.5 px-3",
                    isCollapsed && "size-8! p-0",
                  )}
                >
                  <>
                    {profileImage ? (
                      <Avatar>
                        <Image
                          priority
                          src={profileImage}
                          width={32}
                          height={32}
                          alt={username!}
                        />
                      </Avatar>
                    ) : (
                      <Avatar>
                        <AvatarFallback>
                          <AvatarIcon />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="grow">
                      <p
                        data-testid="user-name"
                        className="truncate text-sm font-semibold"
                      >
                        {fullName !== "undefined undefined"
                          ? fullName
                          : "Invitado"}
                      </p>
                      {username && (
                        <p className="text-muted-foreground truncate text-xs">
                          @{username}
                        </p>
                      )}
                    </div>
                  </>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                data-testid="user-nav-menu"
                className="w-64 min-w-56"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <DropdownMenuItem asChild className="rounded-lg!">
                    <Link href={user ? "/profile" : "/login"}>
                      {profileImage ? (
                        <Avatar>
                          <Image
                            priority
                            src={profileImage}
                            width={32}
                            height={32}
                            alt={username!}
                          />
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarFallback>
                            <AvatarIcon className="text-foreground/80 size-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {fullName !== "undefined undefined"
                            ? fullName
                            : "Invitado"}
                        </span>
                        {username && (
                          <span className="text-muted-foreground truncate text-xs">
                            @{username}
                          </span>
                        )}
                      </div>
                      {isPremium && (
                        <div className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 p-1">
                          <Badge
                            variant={
                              isTrialActive
                                ? "premium"
                                : subscriptionPlan?.name === "Premium"
                                  ? "premium"
                                  : "premiumPlus"
                            }
                            className="text-xxs px-1.5 py-0.5"
                          >
                            {isTrialActive ? "Premium" : subscriptionPlan?.name}
                          </Badge>
                        </div>
                      )}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!isPremium && user && (
                  <>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <SparklesButton
                          variant="gradient"
                          onClick={() => setIsPaymentModalOpen(true)}
                          className="w-full rounded-md"
                        >
                          {!isTrialUsed
                            ? "Activa tu prueba gratuita"
                            : "Actualizar a Premium"}
                        </SparklesButton>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuGroup>
                  {user ? (
                    <>
                      {menuLinks.account.slice(0, -1).map((item, index) => (
                        <DropdownMenuItem asChild key={index}>
                          <Link href={item.path || "#"}>
                            <item.icon />
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/essentia">
                          <BadgeInfo />
                          Descubre Essentia
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/planes">
                          <Sparkles />
                          Planes y Precios
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Configuración y soporte
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {menuLinks.config.map((item, index) => (
                          <DropdownMenuItem asChild key={index}>
                            <Link
                              href={
                                !session?.user && index === 0
                                  ? "/settings/accesibility"
                                  : item.path
                              }
                            >
                              <item.icon />
                              {item.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-transparent! focus:bg-transparent! [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <span className="inline-flex items-center gap-1.5">
                      <SunMoon className="text-muted-foreground" />
                      Tema
                    </span>
                    <ThemeToggle />
                  </div>
                </DropdownMenuGroup>
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      data-testid="user-nav-item-auth"
                      onSelect={() => signOut({ redirectTo: "/login" })}
                    >
                      <LogOut />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {!isPremium && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
          mode={!isTrialUsed ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default MainNavUser;
