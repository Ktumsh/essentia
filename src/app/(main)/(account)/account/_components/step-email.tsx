import { UseFormReturn } from "react-hook-form";

import { BadgeAlert } from "@/components/ui/badge-alert";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface StepEmailProps {
  isMobile: boolean;
  currentEmail: string;
  form: UseFormReturn<
    {
      email: string;
    },
    any,
    {
      email: string;
    }
  >;
}

const StepEmail = ({ isMobile, form, currentEmail }: StepEmailProps) => {
  return (
    <>
      {isMobile ? (
        <>
          <DrawerHeader>
            <DrawerTitle>Cambiar correo electrónico</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild className="mt-4 space-y-1.5 px-4 text-sm">
            <div>
              <p>
                Actualiza tu correo electrónico{" "}
                <span className="font-semibold text-blue-500">
                  {currentEmail}
                </span>{" "}
                ingresando la{" "}
                <span className="text-foreground font-semibold">
                  nueva dirección de correo
                </span>{" "}
                que deseas asociar a tu cuenta de Essentia.
              </p>
              <p>
                Usarás esta dirección de correo electrónico para iniciar sesión.
              </p>
            </div>
          </DrawerDescription>
        </>
      ) : (
        <>
          <DialogHeader isSecondary>
            <BadgeAlert variant="info" />
            <DialogTitle>Cambiar correo electrónico</DialogTitle>
            <DialogDescription asChild>
              <p>
                Actualiza tu correo electrónico{" "}
                <span className="font-semibold text-blue-500">
                  {currentEmail}
                </span>{" "}
                ingresando la{" "}
                <span className="text-foreground font-semibold">
                  nueva dirección de correo
                </span>{" "}
                que deseas asociar a tu cuenta de Essentia. Usarás esta
                dirección de correo electrónico para iniciar sesión.
              </p>
            </DialogDescription>
          </DialogHeader>
        </>
      )}
      <Form {...form}>
        <form className="px-4 py-6 md:p-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default StepEmail;
