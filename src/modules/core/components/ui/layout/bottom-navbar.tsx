"use client";

import { siteConfig } from "@/config/site";
import { Button, Navbar } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import MainSearch from "./main-search";
import Link from "next/link";
import {
  CSSProperties,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/common";
import { formatPathName } from "@/utils/format";

const BottomNav = () => {
  const pathname = usePathname();

  const normalizedPath = formatPathName(pathname);
  const essentiaAi = pathname.startsWith("/essentia-ai");

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.href ||
      (page.href === "/adicionales" &&
        normalizedPath.startsWith("/adicionales")) ||
      (page.href === "/essentia-ai" && essentiaAi),
  }));

  const navItems = useMemo(
    () => [
      ...pages.slice(0, 1),
      {
        name: "Search",
        href: "#",
        icon: () => null,
        fillIcon: () => null,
        active: false,
        isSearch: true,
      },
      ...pages.slice(1),
    ],
    [pages]
  );

  const [underlineStyle, setUnderlineStyle] = useState<CSSProperties>({
    width: 0,
    left: 0,
  });

  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activePageIndex = navItems.findIndex((item) => item.active);

    if (activePageIndex !== -1 && linkRefs.current[activePageIndex]) {
      const activeElement = linkRefs.current[activePageIndex];

      if (activeElement) {
        const newStyle = {
          width: activeElement.clientWidth,
          left: activeElement.offsetLeft,
        };

        if (
          newStyle.width !== underlineStyle.width ||
          newStyle.left !== underlineStyle.left
        ) {
          setUnderlineStyle(newStyle);
        }
      }
    } else {
      if (underlineStyle.width !== 0 || underlineStyle.left !== 0) {
        setUnderlineStyle({
          width: 0,
          left: 0,
        });
      }
    }
  }, [navItems, underlineStyle]);

  return (
    <Navbar
      classNames={{
        base: "fixed md:hidden bottom-0 top-auto bg-white dark:bg-base-full-dark z-50",
        wrapper: "h-14 justify-center gap-0 px-0",
      }}
    >
      <hr
        style={underlineStyle}
        className="absolute top-0 h-1 bg-bittersweet-400 dark:bg-cerise-red-600 transition-all duration-300 ease-in-out"
      />
      {navItems.map((item, index) => (
        <Fragment key={index}>
          {item.isSearch ? (
            <li className="relative flex items-center justify-center size-full">
              <MainSearch />
            </li>
          ) : (
            <li
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              className="relative flex items-center justify-center size-full"
            >
              <Button
                as={Link}
                href={item.href}
                id={`navbar_link_${index}`}
                fullWidth
                radius="none"
                variant="light"
                color="danger"
                className={cn(
                  "!h-full text-gray-500 dark:text-gray-400 data-[hover=true]:text-bittersweet-400 dark:dark:data-[hover=true]:text-cerise-red-600 min-w-0",
                  item.active &&
                    "rounded-t-none text-bittersweet-400 dark:text-cerise-red-600 bg-transparent dark:bg-transparent"
                )}
              >
                {item.active ? (
                  item.fillIcon ? (
                    <item.fillIcon className="size-6" aria-hidden="true" />
                  ) : null
                ) : item.icon ? (
                  <item.icon className="size-6" aria-hidden="true" />
                ) : null}
              </Button>
            </li>
          )}
        </Fragment>
      ))}
    </Navbar>
  );
};

export default BottomNav;
