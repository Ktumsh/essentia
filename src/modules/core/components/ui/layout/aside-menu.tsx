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
    <aside className="hidden md:flex 2xl:w-full max-w-96 max-h-dvh sticky left-0 top-0 md:pt-14">
      <div className="relative flex w-fit lg:w-72 h-full">
        <div className="flex flex-col items-center w-full p-2 pb-0 md:space-y-4 mt-14 md:mt-0">
          <div className="flex flex-col size-full">
            <div className="flex flex-col w-full gap-2 mb-2">
              <div className="hidden lg:flex justify-center items-center w-full h-12 px-5 bg-gray-200 dark:bg-base-dark rounded-lg">
                <div className="flex w-full items-center">
                  <h2 className="font-semibold text-base-color-h dark:text-white">
                    <Greeting />
                  </h2>
                </div>
              </div>
              <div className="hidden lg:flex items-center px-4 gap-5 lg:w-full h-12">
                <h3 className="text-sm font-bold text-base-color-h dark:text-base-color-dark uppercase">
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
                        className="size-5 transition-colors text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white"
                      />
                    }
                    className="w-fit lg:w-full min-w-fit lg:min-w-24 h-auto lg:h-[50px] justify-start text-left p-3 mb-2 data-[hover=true]:bg-gray-200 dark:hover:bg-base-dark !duration-150"
                  >
                    <span className="hidden lg:block text-sm mr-4 transition-colors text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white">
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
