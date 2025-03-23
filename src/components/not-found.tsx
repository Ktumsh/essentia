"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "./kit/button";

const NotFoundWrapper = () => {
  const router = useRouter();

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className={cn(
            "z-[-1]",
            "from-gray-50 to-[#c0c6e6] before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-linear-to-tr before:blur-[80px] before:content-[''] sm:before:w-[1080px]",
            "dark:before:h-[600px] dark:before:w-[980px] dark:before:bg-linear-to-br dark:before:from-transparent dark:before:to-[#ff7373] dark:before:opacity-20",
            "after:absolute after:top-[10%] after:left-[20%] after:z-10 after:h-[580px] after:w-full after:rounded-full after:bg-linear-to-tr after:from-[#f8b6cc] after:to-transparent after:opacity-50 after:blur-[80px] after:content-[''] sm:after:w-[540px]",
            "dark:after:from-full-dark dark:after:top-1/4 dark:after:left-2/3 dark:after:h-[180px] dark:after:w-[260px] dark:after:rounded-none dark:after:bg-linear-to-br dark:after:via-[#ff7373] dark:after:opacity-50 dark:after:blur-3xl",
          )}
        ></div>
      </div>
      <div className="text-foreground relative flex min-h-dvh flex-1 flex-col items-center gap-5 overflow-hidden px-5 md:justify-center md:px-40">
        <div className="top-52 left-1/4 flex max-w-xl flex-col justify-center space-y-5 md:absolute">
          <div className="flex h-full flex-col gap-4 text-center md:h-auto md:text-start">
            <h1 className="font-sans text-3xl font-bold text-wrap md:text-6xl">
              Parece que esta página ha perdido su{" "}
              <span className="bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                esencia
              </span>
              .
            </h1>
            <p className="text-foreground/80 text-lg">
              Pero no te preocupes, siempre puedes regresar al camino del
              bienestar.
            </p>
          </div>

          <div className="fixed inset-x-0 bottom-0 flex w-full justify-between p-5 md:static md:p-0">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="dark:hover:bg-full-dark hover:bg-white"
            >
              <ArrowLeft className="size-5" />
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
