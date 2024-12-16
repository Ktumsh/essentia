import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/modules/core/components/ui/buttons/theme-toggle";
import Logo from "@/modules/core/components/ui/utils/logo";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";

const AuthFooter = () => {
  const links = siteConfig.links;
  const linksMore = siteConfig.footerLinks.more;
  return (
    <div className="sticky bottom-0 border-t border-gray-200 bg-white px-5 dark:border-dark dark:bg-full-dark">
      <div className="mx-auto max-w-7xl">
        <footer className="font-norma relative flex flex-col space-y-8 py-6 text-main dark:text-main-dark">
          <div className="inline-flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-3">
              <Link href="/">
                <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-md">
                  <Logo className="h-4" />
                </div>
              </Link>
              <p className="text-center text-sm antialiased">
                <span>© 2024 Essentia</span>
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex select-none flex-col justify-between gap-8 sm:flex-row md:items-center">
            <div className="flex flex-row items-center gap-x-3">
              <Link
                className="transition-all hover:scale-125 hover:text-bittersweet-400"
                href={links.instagram}
                target="_blank"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                className="transition-all hover:scale-125 hover:text-bittersweet-400"
                href={links.twitter}
                target="_blank"
              >
                <TwitterIcon className="size-[17px]" />
              </Link>
              <Link
                className="transition-all hover:scale-125 hover:text-bittersweet-400"
                href={links.github}
                target="_blank"
              >
                <GithubIcon className="size-5" />
              </Link>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              {linksMore.map((link, index) => (
                <div key={index}>
                  <Link
                    className="inline-block border-b border-transparent hover:border-current"
                    href=""
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
