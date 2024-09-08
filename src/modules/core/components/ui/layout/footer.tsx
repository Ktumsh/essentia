import { BugIcon } from "@/modules/icons/action";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import TooltipCTN from "../utils/tooltip-ctn";

const Footer = () => {
  return (
    <div className="p-4 hidden lg:block">
      <TooltipCTN content="Reportar un error">
        <Button
          as={Link}
          href="https://github.com/Ktumsh/essentia/issues/new"
          target="_blank"
          variant="flat"
          size="sm"
          isIconOnly
          className="min-w-0 mb-2 !size-7 bg-black/10 dark:bg-white/10 text-base-color-h dark:text-base-color-dark-h"
        >
          <BugIcon className="size-4 " />
        </Button>
      </TooltipCTN>
      <footer aria-label="Essentia" role="contentinfo">
        <span className="text-xs text-base-color-h dark:text-base-color-dark-h">
          <ul className="inline">
            <li className="inline">
              <Link
                href=""
                role="link"
                target="_self"
                className="hover:underline"
              >
                Política de privacidad
              </Link>
              <span aria-hidden="true"> • </span>
            </li>
            <li className="inline">
              <Link
                href=""
                role="link"
                target="_self"
                className="hover:underline"
              >
                Términos y condiciones
              </Link>
              <span aria-hidden="true"> • </span>
            </li>
            <li className="inline">
              <Link
                href=""
                role="link"
                target="_self"
                className="hover:underline"
              >
                Cookies
              </Link>
              <span aria-hidden="true"> • </span>
            </li>
            <li className="inline">
              <Link
                href=""
                role="link"
                target="_self"
                className="hover:underline"
              >
                Acerca de
              </Link>
            </li>
            <li className="text-base-color-m dark:text-base-color-dark-m mt-2">
              © 2024 Essentia®️
            </li>
          </ul>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
