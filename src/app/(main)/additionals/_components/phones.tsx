import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { PhoneIcon } from "@/components/ui/icons/status";
import { PHONES } from "@/consts/phones";

import SectionTitleWarning from "./section-title-warning";

const Phones = () => {
  return (
    <section className="mt-5 flex flex-col items-center overflow-hidden">
      <SectionTitleWarning
        title="Teléfonos de emergencia"
        hash="telefonos-de-emergencia"
      />
      <div className="no-scrollbar inline-flex max-w-full flex-1 snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-12 md:px-0">
        {PHONES.map((phone, index) => (
          <Card
            key={index}
            className="group flex max-w-[91%] shrink-0 snap-start flex-col shadow-none sm:col-span-4 md:max-w-full"
          >
            <CardHeader isSecondary>
              <CardTitle className="text-base md:text-lg">
                {phone.title}
              </CardTitle>
              <CardDescription>{phone.description}</CardDescription>
            </CardHeader>
            <CardFooter isSecondary className="justify-start!">
              <span>
                <PhoneIcon className="text-muted-foreground size-4" />
              </span>
              <span className="ml-2 font-semibold">Llame al {phone.phone}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Phones;
