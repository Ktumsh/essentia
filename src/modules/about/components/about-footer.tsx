import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";
import { cn } from "@/utils/common";

const AboutFooter = () => {
  const links = siteConfig.links;
  const linksMore = siteConfig.footerLinks.more;
  return (
    <div className="z-0 bg-white px-5">
      <div className="mx-auto max-w-7xl">
        <footer className="relative flex flex-col space-y-8 py-6 font-normal text-main">
          <div className="flex select-none flex-col justify-between gap-8 sm:flex-row md:items-center">
            <div className="inline-flex items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <Link
                  className="relative size-8 rounded-full transition-transform active:scale-95"
                  href="/"
                  aria-label="Página de inicio"
                >
                  <Image
                    className="aspect-auto h-8 w-auto transition-all ease-in-out"
                    width={32}
                    height={32}
                    quality={100}
                    src="/logo-essentia.webp"
                    alt="Logo de Essentia"
                    priority
                  />
                </Link>
                <p className="text-center text-sm antialiased">
                  <span>© 2024 Essentia®️</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-3">
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
                    className={cn(
                      "inline-block border-b border-transparent hover:border-current",
                      index === 0 && "hidden",
                    )}
                    href={link.href}
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
