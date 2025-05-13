import { Ambulance, PhoneIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { PHONE_COLORS, PHONES_DATA } from "@/consts/phones";
import { cn } from "@/lib/utils";

import SectionTitleWarning from "../../_components/section-title-warning";

const Phones = () => {
  const theme = PHONE_COLORS;

  return (
    <section className="@container/phones mt-10 flex flex-col items-center overflow-hidden">
      <SectionTitleWarning
        title="Teléfonos de emergencia"
        hash="telefonos-de-emergencia"
        color={theme.text}
        icon={<Ambulance className={cn("size-5", theme.text)} />}
      />
      <div className="no-scrollbar inline-flex w-full max-w-full flex-1 snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:gap-12 @xl/phones:grid-cols-2 @5xl/phones:grid-cols-3">
        {PHONES_DATA.map((phone, index) => {
          return (
            <Card
              key={index}
              className={cn(
                "flex max-w-[91%] shrink-0 snap-start flex-col shadow-none md:max-w-full",
                theme.border,
              )}
            >
              <CardHeader isSecondary>
                <CardTitle>{phone.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {phone.description}
                </CardDescription>
              </CardHeader>
              <CardFooter
                className={cn(
                  "rounded-xl rounded-tl-none border-l-4 p-4",
                  theme.bg,
                  theme.borderAccent,
                  theme.text,
                )}
              >
                <span>
                  <PhoneIcon className="size-4" />
                </span>
                <span className="ml-2 text-base font-semibold">
                  LLama al {phone.phone}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Phones;
