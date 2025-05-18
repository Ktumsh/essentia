import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/media";
import FullLogo from "@/components/ui/layout/full-logo";
import ThemeToggle from "@/components/ui/layout/theme-toggle";
import { navConfig } from "@/config/nav.config";
import { siteConfig } from "@/config/site.config";

const AuthFooter = () => {
  const links = siteConfig.links;
  const linksMore = navConfig.footerLinks.more;
  return (
    <div className="bg-background border-t px-5">
      <div className="mx-auto max-w-7xl">
        <footer className="font-norma text-foreground relative flex flex-col space-y-8 py-6">
          <div className="inline-flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <FullLogo />
              <p className="text-center text-sm antialiased">
                <span>© 2025 Essentia</span>
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex flex-col justify-between gap-8 select-none sm:flex-row md:items-center">
            <div className="flex flex-row items-center gap-x-3">
              <Link
                className="hover:text-primary transition-all hover:scale-110"
                href={links.instagram}
                target="_blank"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                className="hover:text-primary transition-all hover:scale-110"
                href={links.facebook}
                target="_blank"
              >
                <FacebookIcon className="size-5" />
              </Link>
              <Link
                className="hover:text-primary transition-all hover:scale-110"
                href={links.twitter}
                target="_blank"
              >
                <TwitterIcon className="size-[17px]" />
              </Link>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              {linksMore.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-b border-transparent hover:border-current"
                  >
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AuthFooter;
