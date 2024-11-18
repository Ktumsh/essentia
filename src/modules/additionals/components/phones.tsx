import { Chip, Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { PHONES } from "@/consts/phones";
import { HashIcon } from "@/modules/icons/common";
import { PhoneIcon } from "@/modules/icons/status";
import { cn } from "@/utils/common";

const Phones = () => {
  return (
    <section className="mt-5 flex flex-col items-center overflow-hidden">
      <div className="mb-2 self-start">
        <Button
          as={Link}
          id="telefonos-de-emergencia"
          data-id="telefonos-de-emergencia"
          data-name="Teléfonos de emergencia"
          href="#telefonos-de-emergencia"
          disableRipple
          radius="none"
          variant="flat"
          endContent={
            <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
          }
          className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="ml-2 size-3" />}
          >
            <h3>Teléfonos de emergencia</h3>
          </Chip>
        </Button>
      </div>
      <div className="custom-scroll inline-flex max-w-full flex-1 snap-x snap-mandatory gap-2 overflow-x-auto scrollbar-hide md:grid md:grid-cols-12 md:px-0">
        {PHONES.map((phone, index) => (
          <Card
            key={index}
            radius="sm"
            shadow="none"
            className={cn(
              "group max-w-[90%] shrink-0 snap-start border border-gray-200 bg-white text-main-h dark:border-dark dark:bg-full-dark dark:text-white sm:col-span-4 md:max-w-full md:dark:border-dark",
            )}
          >
            <CardBody className="z-10">
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
            </CardBody>
            <CardFooter className="z-10 rounded-none border-t border-gray-200 bg-gray-100 dark:border-dark dark:bg-dark/50">
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
