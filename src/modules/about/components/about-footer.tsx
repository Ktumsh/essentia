import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";
import { cn } from "@/utils/common";

const AboutFooter = () => {
  const links = siteConfig.links;
  const linksMore = siteConfig.footerLinks.more;
  return (
    <div className="bg-white px-5 z-0">
      <div className="max-w-7xl mx-auto">
        <footer className="relative flex flex-col text-base-color font-normal py-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between md:items-center gap-8 select-none">
            <div className="inline-flex items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <Link
                  className="relative size-8 active:scale-95 transition-transform rounded-full"
                  href="/"
                  aria-label="Página de inicio"
                >
                  <Image
                    className="h-8 w-auto aspect-auto transition-all ease-in-out"
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
            <div className="flex justify-center items-center gap-x-3">
              <Link
                className="hover:text-bittersweet-400 hover:scale-125 transition-all"
                href={links.instagram}
                target="_blank"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                className="hover:text-bittersweet-400 hover:scale-125 transition-all"
                href={links.twitter}
                target="_blank"
              >
                <TwitterIcon className="size-[17px]" />
              </Link>
              <Link
                className="hover:text-bittersweet-400 hover:scale-125 transition-all"
                href={links.github}
                target="_blank"
              >
                <GithubIcon className="size-5" />
              </Link>
            </div>
            <div className="flex items-center justify-between text-sm gap-4">
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
