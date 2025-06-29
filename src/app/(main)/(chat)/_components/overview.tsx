import { motion } from "motion/react";
import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import AerisLogo from "@/components/layout/aeris-logo";
import { Card, CardHeader } from "@/components/ui/card";
import { getRouteColor, getRouteDarkColor, cn } from "@/utils";

const resources = [
  { title: "salud y bienestar" },
  { title: "ejercicio" },
  { title: "nutrición" },
  { title: "bienestar emocional" },
  { title: "salud sexual" },
];

const Overview = () => {
  return (
    <>
      <div className="z-10 mx-auto mt-auto mb-32 w-full max-w-xl px-4 pt-6 md:mb-20">
        <Card className="border-0 bg-transparent text-center leading-relaxed">
          <CardHeader className="items-center gap-4 md:gap-8 md:p-8">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-background flex items-center gap-2 rounded-md px-3 py-1">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-premium w-fit bg-clip-text text-3xl font-semibold text-transparent md:text-4xl"
                >
                  Habla con{" "}
                  <span className="-ml-1">
                    <AerisLogo
                      src="/aeris-logo-fuchsia.svg"
                      width={40}
                      height={40}
                      className="-mr-1.5 inline-block h-10 -translate-y-[5px] align-top"
                    />
                    eris
                  </span>
                </motion.h1>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base"
            >
              Haz preguntas sobre{" "}
              {resources.map((resource, index) => (
                <span key={index}>
                  <code
                    className={cn(
                      "rounded-sm px-1 py-0.5",
                      getRouteColor(index, "background"),
                      getRouteDarkColor(index),
                    )}
                  >
                    {resource.title}
                  </code>
                  {index < resources.length - 1 ? ", " : " "}
                </span>
              ))}
              y{" "}
              <code
                className={cn(
                  "rounded-sm px-1 py-0.5",
                  getRouteColor(resources.length, "background"),
                  getRouteDarkColor(resources.length),
                )}
              >
                más
              </code>
              .
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.7 }}
              className="text-sm md:text-base"
            >
              Recibe orientación confiable y cercana con la ayuda de{" "}
              <Link
                href="/soporte?q=quien%20es%20aeris"
                target="_blank"
                rel="noopener"
                className="text-secondary hover:underline"
              >
                Aeris
                <LinkIcon className="mb-1 ml-0.5 inline size-2" />
              </Link>
              .
            </motion.p>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Overview;
