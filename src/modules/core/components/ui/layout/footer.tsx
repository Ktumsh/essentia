import { BugIcon } from "@/modules/icons/action";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import TooltipCTN from "../utils/tooltip-ctn";
import { cn } from "@/utils/common";
import { siteConfig } from "@/config/site";

interface FooterProps {
  isMobile?: boolean;
}

const Footer = ({ isMobile }: FooterProps) => {
  const links = siteConfig.desktopFooterLinks.more;
  return (
    <div className={cn(!isMobile ? "p-4 hidden lg:block" : undefined)}>
      {!isMobile && (
        <TooltipCTN content="Reportar un error">
          <Button
            as={Link}
            href="https://github.com/Ktumsh/essentia/issues/new"
            aria-label="Reportar un error"
            variant="flat"
            size="sm"
            isIconOnly
            className="min-w-0 mb-2 !size-7 bg-black/10 dark:bg-white/10 text-base-color-h dark:text-base-color-dark-h"
          >
            <span className="sr-only">Reportar un error</span>
            <BugIcon className="size-5" />
          </Button>
        </TooltipCTN>
      )}
      <footer aria-label="Essentia" role="contentinfo">
        <span className="text-xs text-base-color-h dark:text-base-color-dark-h">
          <ul className="inline">
            {links.map((link, index) => (
              <li key={index} className="inline">
                <Link
                  href={link.href}
                  role="link"
                  target="_self"
                  className="hover:underline"
                >
                  {link.text}
                </Link>
                {index < links.length - 1 && (
                  <span aria-hidden="true"> • </span>
                )}
              </li>
            ))}
            <li className="mt-2">© 2024 Essentia®️</li>
          </ul>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
