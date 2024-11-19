import { TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PHONES } from "@/consts/phones";
import { HashIcon } from "@/modules/icons/common";
import { PhoneIcon } from "@/modules/icons/status";
import { cn } from "@/utils/common";

const Phones = () => {
  return (
    <section className="mt-5 flex flex-col items-center overflow-hidden">
      <div className="mb-2 self-start">
        <Link
          id="telefonos-de-emergencia"
          data-id="telefonos-de-emergencia"
          data-name="Teléfonos de emergencia"
          href="#telefonos-de-emergencia"
          className="group flex h-auto w-fit items-center p-0 text-xl font-semibold transition active:scale-100"
        >
          <Badge variant="primary" className="gap-1 py-1">
            <TriangleAlert className="size-3.5" />
            <h3>Teléfonos de emergencia</h3>
          </Badge>
          <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
      <div className="custom-scroll inline-flex max-w-full flex-1 snap-x snap-mandatory gap-2 overflow-x-auto scrollbar-hide md:grid md:grid-cols-12 md:px-0">
        {PHONES.map((phone, index) => (
          <Card
            key={index}
            className={cn(
              "group flex max-w-[90%] shrink-0 snap-start flex-col border border-gray-200 bg-white p-0 text-main-h dark:border-dark dark:bg-full-dark dark:text-white sm:col-span-4 md:max-w-full md:dark:border-dark",
            )}
          >
            <CardContent className="flex h-auto flex-auto flex-col p-3">
              <div className="mb-3 inline-flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold md:text-xl">
                  {phone.title}
                </h3>
              </div>
              <div>
                <p className="text-sm text-main-h dark:text-main-dark">
                  {phone.description}
                </p>
              </div>
            </CardContent>
            <CardFooter className="z-10 rounded-none border-t border-gray-200 bg-gray-100 p-3 dark:border-dark dark:bg-dark/50">
              <span>
                <PhoneIcon className="size-5 text-main-m dark:text-main-dark-m" />
              </span>
              <span className="ml-2 font-semibold text-main dark:text-white md:text-lg">
                Llame al {phone.phone}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Phones;
