"use client";

import { FC } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import ProfileDropdown from "./profile-dropdown";
import Image from "next/image";
import Link from "next/link";
import { usernameOrEmail } from "@/utils/common";
import {
  HomeFillIcon,
  HomeIcon,
  ResourcesFillIcon,
  ResourcesIcon,
  StoriesFillIcon,
  StoriesIcon,
  SupportFillIcon,
  SupportIcon,
} from "@/modules/icons/interface";
import { GoBackIcon } from "@/modules/icons/navigation";
import { Session } from "@/types/session";

interface ComunityHeaderProps {
  session: Session;
}

const CommunityHeader: FC<ComunityHeaderProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getFirstNameAndLastName = (fullName: string | undefined | null) => {
    if (!fullName) return "Usuario";
    const nameParts = fullName.toLowerCase().split(" ");
    if (nameParts.length < 3) return capitalize(fullName);
    return `${capitalize(nameParts[0])} ${capitalize(
      nameParts[nameParts.length - 2]
    )}`;
  };

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const normalizeName = getFirstNameAndLastName(session?.user?.name);

  const name = normalizeName;

  const lastname = session?.user?.lastname || "";

  const hasUsernameOrEmail = usernameOrEmail(session);

  const profileAvatar = session?.user?.image;

  const headerLinks = [
    {
      name: "Inicio",
      icon: HomeIcon,
      iconFill: HomeFillIcon,
      href: "/comunidad/blog",
    },
    {
      name: "Grupos de apoyo",
      icon: SupportIcon,
      iconFill: SupportFillIcon,
      href: "/comunidad/support-groups",
    },
    {
      name: "Historias inspiradoras",
      icon: StoriesIcon,
      iconFill: StoriesFillIcon,
      href: "/comunidad/inspiring-stories",
    },
    {
      name: "Recursos comunitarios",
      icon: ResourcesIcon,
      iconFill: ResourcesFillIcon,
      href: "/comunidad/community-resources",
    },
  ];

  return (
    <header className="relative flex grow sm:w-2/12 md:w-1/4 lg:w-auto justify-end">
      <div className="flex size-full justify-end lg:w-[310px]">
        <div className="flex flex-col items-center justify-between lg:p-2">
          <div className="flex flex-col items-center lg:items-stretch">
            <div className="hidden lg:block w-fit h-full p-3 rounded-full">
              <Link href="/comunidad" className="inline-flex dark:hidden">
                <Image
                  width={192}
                  height={66}
                  src="/essentia-community-logo-light.png"
                  alt="Essentia Community Logo"
                />
              </Link>
              <Link href="/comunidad" className="dark:inline-flex hidden">
                <Image
                  width={192}
                  height={66}
                  src="/essentia-community-logo-dark.png"
                  alt="Essentia Community Logo"
                />
              </Link>
            </div>
            <div className="lg:hidden w-fit h-full p-3 rounded-full">
              <Link href="/comunidad" className="inline-flex dark:hidden">
                <Image
                  width={28}
                  height={28}
                  src="/e-logomark-on-light.webp"
                  alt="Essentia Community Logo"
                />
              </Link>
              <Link href="/comunidad" className="dark:inline-flex hidden">
                <Image
                  width={28}
                  height={28}
                  src="/e-logomark-on-dark.webp"
                  alt="Essentia Community Logo"
                />
              </Link>
            </div>
            <ul>
              {headerLinks.map((link, index) => {
                const isActive = pathname.includes(link.href);
                return (
                  <li key={index}>
                    <Button
                      size="lg"
                      radius="full"
                      color="danger"
                      variant="light"
                      onClick={() => router.push(link.href)}
                      startContent={
                        isActive ? (
                          <link.iconFill
                            className={`size-7 lg:mr-2 font-bold text-black dark:text-white`}
                          />
                        ) : (
                          <link.icon
                            className={`size-7 lg:mr-2 font-medium text-base-color dark:text-base-color-dark`}
                          />
                        )
                      }
                      className="min-w-fit lg:min-w-[294px] w-fit h-[50px] justify-start text-left p-3 mb-2"
                    >
                      <span
                        className={`hidden lg:block text-lg mr-4 ${
                          isActive
                            ? "font-bold text-black dark:text-white"
                            : "font-medium text-base-color dark:text-base-color-dark"
                        }`}
                      >
                        {link.name}
                      </span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-stretch w-full">
            <Link className="w-fit" href="/">
              <Button
                size="lg"
                radius="full"
                color="danger"
                variant="light"
                startContent={
                  <GoBackIcon className="size-6 lg:mr-2 text-bittersweet-400 dark:text-cerise-red-300" />
                }
                className="min-w-fit lg:min-w-24 w-fit h-[50px] p-3 mb-2"
              >
                <span className="hidden lg:block mr-4 justify-start text-left text-bittersweet-400 dark:text-cerise-red-300">
                  Volver a Essentia
                </span>
              </Button>
            </Link>
            <ProfileDropdown session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CommunityHeader;
