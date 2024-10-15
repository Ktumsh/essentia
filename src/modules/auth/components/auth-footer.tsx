import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/modules/core/components/ui/buttons/theme-toggle";
import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";
import Image from "next/image";
import Link from "next/link";

const AuthFooter = () => {
  const links = siteConfig.links;
  const linksMore = siteConfig.footerLinks.more;
  return (
    <div className="bg-white dark:bg-base-full-dark border-t border-gray-200 dark:border-base-dark px-5 z-0">
      <div className="max-w-[1250px] mx-auto">
        <footer className="relative flex flex-col text-base-color dark:text-base-color-dark font-norma py-6 space-y-8">
          <div className="inline-flex w-full items-center justify-between">
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
            <ThemeToggle />
          </div>
          <div className="flex flex-col sm:flex-row justify-between md:items-center gap-8 select-none">
            <div className="flex flex-row items-center gap-x-3">
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
                    className="border-b inline-block border-transparent hover:border-current"
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
