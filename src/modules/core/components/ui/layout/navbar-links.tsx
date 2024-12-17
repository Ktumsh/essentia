import { motion } from "framer-motion";
import Link from "next/link";
import { type JSX } from "react";

import { BetterTooltip } from "@/components/ui/tooltip";
import { IconSvgProps } from "@/types/common";
import { cn } from "@/utils/common";

interface Page {
  name: string;
  href: string;
  icon: (props: IconSvgProps) => JSX.Element;
  activeIcon: (props: IconSvgProps) => JSX.Element;
  active: boolean;
}

interface NavbarLinksProps {
  pages: Page[];
}

const NavbarLinks = ({ pages }: NavbarLinksProps) => {
  return (
    <nav
      role="navigation"
      className="relative inline-flex items-center justify-center gap-4"
    >
      <ul className="relative z-10 flex space-x-4">
        {pages.map(
          (
            { name, href, icon: Icon, activeIcon: ActiveIcon, active },
            index,
          ) => (
            <li
              key={href}
              className="relative flex w-20 items-center justify-center"
            >
              <BetterTooltip content={name}>
                <Link
                  id={`navbar_link_${index + 1}`}
                  aria-label={`Ir a ${name}`}
                  href={href}
                  className={cn(
                    "pointer-events-auto relative inline-flex size-full max-h-12 items-center justify-center rounded-lg px-3 py-2 text-white transition-colors",
                    !active &&
                      "text-main-h hover:bg-gray-200 dark:text-main-dark-h dark:hover:bg-dark",
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute inset-0 z-[-1] rounded-lg bg-danger"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {active ? (
                    <ActiveIcon className="size-5" aria-hidden="true" />
                  ) : (
                    <Icon className="size-5" aria-hidden="true" />
                  )}
                </Link>
              </BetterTooltip>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default NavbarLinks;
