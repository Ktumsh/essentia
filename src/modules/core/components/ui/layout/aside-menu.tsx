"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

import Footer from "./footer";
import Greeting from "../greeting";

const AsideMenu = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [currentPath]);

  const asideLinks = siteConfig.asideMenuLinks;

  return (
    <aside className="sticky left-0 top-0 hidden max-h-dvh max-w-96 md:flex md:pt-14 2xl:w-full">
      <div className="relative flex h-full w-fit lg:w-72">
        <div className="mt-14 flex w-full flex-col items-center p-2 pb-0 md:mt-0 md:space-y-4">
          <div className="flex size-full flex-col">
            <div className="mb-2 flex w-full flex-col gap-2">
              <div className="hidden h-12 w-full items-center justify-center rounded-lg bg-gray-200 px-5 dark:bg-dark lg:flex">
                <div className="flex w-full items-center">
                  <h2 className="font-semibold text-main-h dark:text-white">
                    <Greeting />
                  </h2>
                </div>
              </div>
              <div className="hidden h-12 items-center gap-5 px-4 lg:flex lg:w-full">
                <h3 className="text-sm font-semibold uppercase text-main-h dark:text-main-dark">
                  Recursos
                </h3>
              </div>
            </div>
            <ul>
              {asideLinks.map((link, index) => (
                <li key={index} className="w-fit lg:w-full">
                  <Button
                    as={Link}
                    href={link.link}
                    aria-label={link.name}
                    disableRipple
                    fullWidth
                    size="lg"
                    radius="sm"
                    variant="light"
                    startContent={
                      <link.icon
                        aria-hidden="true"
                        className="size-5 text-main-h transition-colors group-hover:text-main dark:text-main-dark dark:group-hover:text-white"
                      />
                    }
                    className="mb-2 h-auto w-fit min-w-fit justify-start p-3 text-left !duration-150 data-[hover=true]:bg-gray-200 dark:hover:bg-dark lg:h-[50px] lg:w-full lg:min-w-24"
                  >
                    <span className="mr-4 hidden text-sm text-main-h transition-colors group-hover:text-main dark:text-main-dark dark:group-hover:text-white lg:block">
                      {link.name}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    </aside>
  );
};

export default AsideMenu;
