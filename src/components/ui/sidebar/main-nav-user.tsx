import {
  BadgeInfo,
  ChevronsUpDown,
  LogIn,
  LogOut,
  Sparkles,
  SunMoon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

import { Avatar, AvatarFallback } from "@/components/kit/avatar";
import { Button } from "@/components/kit/button";
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
} from "@/components/kit/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { BetterTooltip } from "@/components/kit/tooltip";
import { navConfig } from "@/config/nav.config";
import { UserProfileData } from "@/types/auth";

import { StarsIcon } from "../icons/common";
import { AvatarIcon } from "../icons/miscellaneus";
import ThemeToggle from "../layout/theme-toggle";

interface MainNavUserProps {
  session: Session | null;
  user: UserProfileData | null;
  isCollapsed?: boolean;
}

const MainNavUser = ({ session, user, isCollapsed }: MainNavUserProps) => {
  const router = useRouter();

  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const fullName = `${firstName} ${lastName}`;

  const menuLinks = navConfig.menuFooterLinks;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                tooltip="Perfil"
                isActive
                className={isCollapsed ? "size-8! p-0" : ""}
              >
                <>
                  {profileImage ? (
                    <Avatar className="size-8 rounded-md">
                      <Image
                        priority
                        src={profileImage}
                        width={32}
                        height={32}
                        alt={username!}
                      />
                    </Avatar>
                  ) : (
                    <Avatar className="size-8 rounded-md">
                      <AvatarFallback className="rounded-md">
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
                </>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side="right"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <DropdownMenuItem asChild>
                  <Link href={user ? "/profile" : "/login"}>
                    {profileImage ? (
                      <Avatar className="size-8 rounded-md">
                        <Image
                          priority
                          src={profileImage}
                          width={32}
                          height={32}
                          alt={username!}
                        />
                      </Avatar>
                    ) : (
                      <Avatar className="size-8 rounded-md">
                        <AvatarFallback className="rounded-md">
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
                      <BetterTooltip content="Cuenta Premium">
                        <div className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 p-1">
                          <StarsIcon
                            aria-hidden="true"
                            className="stars-icon v2 size-5! focus:outline-hidden"
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
                      <Button
                        variant="gradient"
                        fullWidth
                        onClick={() => router.push("/pricing")}
                        className="transition focus:text-white"
                      >
                        <StarsIcon
                          aria-hidden="true"
                          className="size-4 **:fill-white focus:outline-hidden"
                        />
                        Hazte premium
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              {!user && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="gradient"
                        fullWidth
                        onClick={() => router.push("/login")}
                        className="transition focus:text-white focus-visible:ring-0"
                      >
                        <LogIn
                          aria-hidden="true"
                          className="size-4 **:fill-white focus:outline-hidden"
                        />
                        Inicia sesión
                      </Button>
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
                          <link.icon />
                          {link.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/about">
                        <BadgeInfo />
                        Descubre Essentia
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing">
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
                      {menuLinks.config.map((link, index) => (
                        <DropdownMenuItem asChild key={index}>
                          <Link
                            href={
                              !session?.user && index === 0
                                ? "/settings/accesibility"
                                : link.link
                            }
                          >
                            <link.icon />
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
                    onSelect={() => signOut({ redirectTo: "/logout" })}
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
  );
};

export default MainNavUser;
