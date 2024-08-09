import Link from "next/link";

import { InstagramIcon, TwitterIcon, GithubIcon } from "@/modules/icons/media";

const Footer = () => {
  return (
    <div id="footer" className="self-stretch w-full bg-gray-50 bottom-0 px-5">
      <div className="max-w-[1250px] mx-auto">
        <footer className="relative text-base-color font-normal">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
            <div className="flex items-center justify-start sm:w-[33%] text-sm gap-4">
              <div>
                <Link
                  className="border-b inline-block border-transparent hover:border-base-color"
                  href=""
                >
                  Privacidad
                </Link>
              </div>
              <div>
                <Link
                  className="border-b inline-block border-transparent hover:border-base-color"
                  href=""
                >
                  Términos
                </Link>
              </div>
              <div>
                <Link
                  className="border-b inline-block border-transparent hover:border-base-color"
                  href=""
                >
                  Cookies
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center order-3 sm:w-[33%] sm:order-none">
              <p className="text-center text-sm antialiased">
                <span>© 2024 Essentia® - Todos los derechos reservados</span>
              </p>
            </div>

            <div className="flex flex-row items-center justify-end sm:w-[33%] gap-x-3">
              <Link
                className="hover:text-bittersweet-400 hover:scale-125 transition-all"
                href="https://www.instagram.com/ktumsh/"
                target="_blank"
              >
                <InstagramIcon className="size-6" />
              </Link>
              <Link
                className="hover:text-bittersweet-400 hover:scale-125 transition-all"
                href="https://twitter.com"
                target="_blank"
              >
                <TwitterIcon className="size-[21px]" />
              </Link>
              <Link
                className="hover:text-bittersweet-400 hover:scale-125 transition-all"
                href="https://github.com/Ktumsh/essentia-web"
                target="_blank"
              >
                <GithubIcon className="size-6" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
