"use client";

import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/common";

const NotFoundWrapper = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className={cn(
            "z-[-1]",
            "from-gray-50 to-[#c0c6e6] before:absolute before:left-1/2 before:top-0 before:h-[800px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr before:blur-[80px] before:content-[''] sm:before:w-[1080px]",
            "before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-20",
            "after:absolute after:left-[20%] after:top-[10%] after:z-10 after:h-[580px] after:w-full after:rounded-full after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:opacity-50 after:blur-[80px] after:content-[''] sm:after:w-[540px]",
            "after:dark:left-2/3 after:dark:top-1/4 after:dark:h-[180px] after:dark:w-[260px] after:dark:rounded-none after:dark:bg-gradient-to-br after:dark:from-full-dark after:dark:via-[#ff7373] after:dark:opacity-50 after:dark:blur-3xl",
          )}
        ></div>
      </div>
      <div className="relative flex min-h-dvh flex-col items-center gap-5 overflow-hidden px-5 text-main dark:text-white md:justify-center md:px-40">
        <div className="left-1/4 top-52 flex max-w-xl flex-col justify-center space-y-5 md:absolute">
          <div className="flex h-full flex-col gap-4 text-center md:h-auto md:text-start">
            <h1 className="text-wrap font-sans text-3xl font-extrabold md:text-6xl">
              Parece que esta página ha perdido su{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-300 bg-clip-text text-transparent drop-shadow">
                esencia
              </span>
              .
            </h1>
            <p className="text-lg text-main-h dark:text-main-dark">
              Pero no te preocupes, siempre puedes regresar al camino del
              bienestar.
            </p>
          </div>

          <div className="fixed inset-x-0 bottom-0 flex w-full justify-between p-5 md:static md:p-0">
            <Button
              as={Link}
              href="/"
              disableRipple
              variant="solid"
              startContent={<ArrowLeftIcon className="size-5" />}
              className="h-14 w-full rounded-full border border-gray-200 bg-white text-main shadow-md dark:border-white/10 dark:bg-dark md:h-10 md:w-auto md:rounded-lg md:text-sm"
            >
              Recuperar mi esencia
            </Button>
          </div>
        </div>

        <div className="pointer-events-none -bottom-20 left-20 -z-10 -order-1 mt-20 md:absolute md:order-none md:mt-0">
          <Image
            width={1132}
            height={1132}
            quality={80}
            priority
            src="/logo-essentia.webp"
            alt="Logo Essentia"
            aria-hidden="true"
            className="h-64 w-auto [mask-image:linear-gradient(to_bottom,_rgba(0,_0,_0,_1)_0%,_transparent_90%)] md:h-[1132px] md:opacity-30"
          />
        </div>
      </div>
    </>
  );
};

export default NotFoundWrapper;
