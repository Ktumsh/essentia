import { Hash, TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PHONES } from "@/consts/phones";
import { PhoneIcon } from "@/modules/icons/status";

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
            <TriangleAlert strokeWidth={1.5} className="size-3.5" />
            <h3>Teléfonos de emergencia</h3>
          </Badge>
          <Hash
            strokeWidth={1.5}
            className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </Link>
      </div>
      <div className="custom-scroll inline-flex max-w-full flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-12 md:px-0">
        {PHONES.map((phone, index) => (
          <Card
            key={index}
            className="group flex max-w-[91%] shrink-0 snap-start flex-col shadow-none sm:col-span-4 md:max-w-full"
          >
            <CardHeader isSecondary>
              <CardTitle className="text-base dark:text-white md:text-lg">
                {phone.title}
              </CardTitle>
              <CardDescription>{phone.description}</CardDescription>
            </CardHeader>
            <CardFooter isSecondary className="!justify-start">
              <span>
                <PhoneIcon className="size-4 text-main-m dark:text-main-dark-m" />
              </span>
              <span className="ml-2 font-semibold text-main dark:text-white">
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
