import { PHONES } from "@/consts/phones";
import { PhoneIcon } from "@/modules/icons/status";
import {
  Chip,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/common";
import Link from "next/link";
import { HashIcon } from "@/modules/icons/common";

const Phones = () => {
  return (
    <section className="flex flex-col items-center mt-5">
      <div className="self-start mb-2">
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
            <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
          }
          className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="size-3 ml-2" />}
          >
            <h3>Teléfonos de emergencia</h3>
          </Chip>
        </Button>
      </div>
      <div className="w-full grid grid-cols-12 gap-2 md:px-0">
        {PHONES.map((phone, index) => (
          <Card
            key={index}
            radius="sm"
            className={cn(
              "shadow-none md:shadow-md group col-span-12 sm:col-span-4 bg-white dark:bg-base-dark-50 md:dark:bg-base-full-dark border border-gray-300 md:border-gray-200 dark:border-base-dark md:dark:border-base-dark text-base-color-h dark:text-base-color-dark"
            )}
          >
            <CardBody className="z-10">
              <div className="inline-flex items-center justify-between w-full mb-3">
                <h3 className="text-lg md:text-xl font-semibold">
                  {phone.title}
                </h3>
              </div>
              <div>
                <p className="text-sm text-base-color-h dark:text-base-color-dark-h">
                  {phone.description}
                </p>
              </div>
            </CardBody>
            <CardFooter className="bg-gray-100 dark:bg-base-dark-50 border-t border-gray-200 dark:border-base-dark rounded-none z-10">
              <span>
                <PhoneIcon className="size-5 text-base-color-m dark:text-base-color-dark-m" />
              </span>
              <span className="ml-2 md:text-lg font-semibold text-base-color dark:text-base-color-dark">
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
