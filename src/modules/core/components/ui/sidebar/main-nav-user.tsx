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
import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { BetterTooltip } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { StarsIcon } from "@/modules/icons/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";

import ThemeToggle from "../buttons/theme-toggle";

interface MainNavUserProps {
  session: Session | null;
  user: UserProfileData | null;
  isCollapsed?: boolean;
}

const MainNavUser = ({ session, user, isCollapsed }: MainNavUserProps) => {
  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const fullName = `${firstName} ${lastName}`;

  const { isMobile } = useSidebar();

  if (isMobile) return null;

  const menuLinks = siteConfig.menuFooterLinks;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                tooltip="Perfil"
                className={isCollapsed ? "!size-8 p-0" : ""}
              >
                <>
                  {profileImage ? (
                    <Avatar className="size-8 rounded-lg">
                      <Image
                        priority
                        src={profileImage}
                        width={32}
                        height={32}
                        alt={username!}
                      />
                    </Avatar>
                  ) : (
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        <AvatarIcon className="size-4 text-main-h dark:text-main-dark-h" />
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
                      <span className="truncate text-xs text-main-m dark:text-main-dark-m">
                        @{username}
                      </span>
                    )}
                  </div>
                </>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="right"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <DropdownMenuItem asChild>
                  <Link href={user ? "/profile" : "/login"}>
                    {profileImage ? (
                      <Avatar className="size-8 rounded-lg">
                        <Image
                          priority
                          src={profileImage}
                          width={32}
                          height={32}
                          alt={username!}
                        />
                      </Avatar>
                    ) : (
                      <Avatar className="size-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          <AvatarIcon className="size-4 text-main-h dark:text-main-dark-h" />
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
                        <span className="truncate text-xs text-main-m dark:text-main-dark-m">
                          @{username}
                        </span>
                      )}
                    </div>
                    {isPremium && (
                      <BetterTooltip content="Cuenta Premium">
                        <div className="absolute right-0 top-1/2 mr-2 -translate-y-1/2 p-1">
                          <StarsIcon
                            aria-hidden="true"
                            className="stars-icon v2 !size-5 focus:outline-none"
                          />
                        </div>
                      </BetterTooltip>
                    )}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isPremium && user && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pricing"
                        className="justify-center rounded-md bg-light-gradient-v2 text-sm text-white focus:text-white dark:bg-dark-gradient"
                      >
                        <StarsIcon
                          aria-hidden="true"
                          className="size-4 focus:outline-none [&_*]:fill-white"
                        />
                        Hazte premium
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              {!user && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="justify-center rounded-md bg-light-gradient-v2 text-sm text-white focus:text-white dark:bg-dark-gradient"
                      >
                        Inicia sesión
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuGroup>
                {user ? (
                  <>
                    {menuLinks.account.slice(0, -1).map((link, index) => (
                      <DropdownMenuItem asChild key={index}>
                        <Link href={link.link || "#"}>
                          <link.icon strokeWidth={1.5} />
                          {link.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/about">
                        <BadgeInfo strokeWidth={1.5} />
                        Descubre Essentia
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing">
                        <Sparkles strokeWidth={1.5} />
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
                      {menuLinks.config.map((link, index) => (
                        <DropdownMenuItem asChild key={index}>
                          <Link
                            href={
                              !session?.user && index === 0
                                ? "/settings/accesibility"
                                : link.link
                            }
                          >
                            <link.icon strokeWidth={1.5} />
                            {link.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-default justify-between hover:!bg-transparent hover:!text-inherit focus:!bg-transparent focus:!text-inherit">
                  <span className="inline-flex items-center gap-1.5">
                    <SunMoon strokeWidth={1.5} />
                    Tema
                  </span>
                  <ThemeToggle />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => signOut({ redirectTo: "/logout" })}
                  >
                    <LogOut strokeWidth={1.5} />
                    Cerrar sesión
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default MainNavUser;
