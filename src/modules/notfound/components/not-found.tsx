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
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div
          className={cn(
            "z-[-1]",
            "before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-['']",
            "before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-20",
            "after:absolute after:top-[10%] after:left-[20%] after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-50",
            "after:dark:top-1/4 after:dark:left-2/3 after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-base-full-dark after:dark:via-[#ff7373] after:dark:opacity-50 after:dark:blur-3xl after:dark:rounded-none"
          )}
        ></div>
      </div>
      <div className="relative flex flex-col items-center md:justify-center min-h-dvh px-5 md:px-40 gap-5 text-base-color dark:text-white overflow-hidden">
        <div className="md:absolute top-52 left-1/4 flex flex-col justify-center max-w-xl space-y-5">
          <div className="flex flex-col gap-4 text-center md:text-start h-full md:h-auto">
            <h1 className="text-3xl md:text-6xl font-extrabold font-sans text-wrap">
              Parece que esta página ha perdido su{" "}
              <span className="drop-shadow bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-300 bg-clip-text text-transparent">
                esencia
              </span>
              .
            </h1>
            <p className="text-lg text-base-color-h dark:text-base-color-dark">
              Pero no te preocupes, siempre puedes regresar al camino del
              bienestar.
            </p>
          </div>

          <div className="fixed bottom-0 inset-x-0 md:static flex w-full justify-between p-5 md:p-0">
            <Button
              as={Link}
              href="/"
              disableRipple
              variant="solid"
              startContent={<ArrowLeftIcon className="size-5" />}
              className="w-full md:w-auto rounded-full md:rounded-lg h-14 md:h-10 text-base md:text-sm bg-white dark:bg-base-dark shadow-medium border border-gray-200 dark:border-white/10"
            >
              Recuperar mi esencia
            </Button>
          </div>
        </div>

        <div className="-order-1 md:order-none md:absolute left-20 -bottom-20 mt-20 md:mt-0 -z-10 pointer-events-none">
          <Image
            width={1132}
            height={1132}
            quality={80}
            priority
            src="/logo-essentia.webp"
            alt="Logo Essentia"
            aria-hidden="true"
            className="h-64 md:h-[1132px] w-auto md:opacity-30 [mask-image:linear-gradient(to_bottom,_rgba(0,_0,_0,_1)_0%,_transparent_90%)]"
          />
        </div>
      </div>
    </>
  );
};

export default NotFoundWrapper;
