import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";
import { cn } from "@/utils/common";

const AboutFooter = () => {
  const links = siteConfig.links;
  const linksMore = siteConfig.footerLinks.more;
  return (
    <div className="z-0 px-5 bg-white">
      <div className="mx-auto max-w-7xl">
        <footer className="relative flex flex-col py-6 space-y-8 font-normal text-main">
          <div className="flex flex-col justify-between gap-8 select-none sm:flex-row md:items-center">
            <div className="inline-flex items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <Link
                  className="relative transition-transform rounded-full size-8 active:scale-95"
                  href="/"
                  aria-label="Página de inicio"
                >
                  <Image
                    className="w-auto h-8 transition-all ease-in-out aspect-auto"
                    width={32}
                    height={32}
                    quality={100}
                    src="/logo-essentia.webp"
                    alt="Logo de Essentia"
                    priority
                  />
                </Link>
                <p className="text-sm antialiased text-center">
                  <span>© 2024 Essentia®️</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-3">
              <Link
                className="transition-all hover:text-bittersweet-400 hover:scale-125"
                href={links.instagram}
                target="_blank"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                className="transition-all hover:text-bittersweet-400 hover:scale-125"
                href={links.twitter}
                target="_blank"
              >
                <TwitterIcon className="size-[17px]" />
              </Link>
              <Link
                className="transition-all hover:text-bittersweet-400 hover:scale-125"
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
                      "border-b inline-block border-transparent hover:border-current",
                      index === 0 && "hidden"
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
