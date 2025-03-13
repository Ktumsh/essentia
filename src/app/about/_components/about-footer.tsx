import Link from "next/link";

import {
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/ui/icons/media";
import Logo from "@/components/ui/layout/logo";
import { navConfig } from "@/config/nav.config";
import { siteConfig } from "@/config/site.config";

const AboutFooter = () => {
  const links = siteConfig.links;
  const linksMore = navConfig.footerLinks.more;

  return (
    <div className="z-0 bg-white px-6">
      <div className="mx-auto max-w-7xl">
        <footer className="text-main relative flex flex-col space-y-8 py-6 font-normal">
          <div className="flex flex-col justify-between gap-8 select-none sm:flex-row md:items-center">
            <div className="inline-flex items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <Link href="/">
                  <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
                    <Logo className="h-4" />
                  </div>
                </Link>
                <p className="text-center text-sm antialiased">
                  <span>© 2024 Essentia</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-3">
              <Link
                className="hover:text-bittersweet-400 transition-all hover:scale-125"
                href={links.instagram}
                target="_blank"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                className="hover:text-bittersweet-400 transition-all hover:scale-125"
                href={links.twitter}
                target="_blank"
              >
                <TwitterIcon className="size-[17px]" />
              </Link>
              <Link
                className="hover:text-bittersweet-400 transition-all hover:scale-125"
                href={links.github}
                target="_blank"
              >
                <GithubIcon className="size-5" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm md:justify-between">
              {linksMore.map((link, index) => (
                <div key={index} className={index === 0 ? "hidden" : ""}>
                  <Link
                    href={link.href}
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

export default AboutFooter;
