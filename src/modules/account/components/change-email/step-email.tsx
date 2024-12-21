import { UseFormReturn } from "react-hook-form";

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
    undefined
  >;
}

const StepEmail = ({ isMobile, form, currentEmail }: StepEmailProps) => {
  return (
    <>
      {isMobile ? (
        <DrawerHeader>
          <DrawerTitle>Cambiar correo electrónico</DrawerTitle>
          <DrawerDescription className="mt-4 px-4 text-start">
            Actualiza tu correo electrónico{" "}
            <span className="font-semibold text-blue-600">{currentEmail}</span>{" "}
            ingresando la{" "}
            <span className="font-semibold text-main dark:text-white">
              nueva dirección de correo
            </span>{" "}
            que deseas asociar a tu cuenta de Essentia. Usarás esta dirección de
            correo electrónico para iniciar sesión.
          </DrawerDescription>
        </DrawerHeader>
      ) : (
        <>
          <DialogHeader isSecondary>
            <DialogTitle>Cambiar correo electrónico</DialogTitle>
            <DialogDescription asChild>
              <p>
                Actualiza tu correo electrónico{" "}
                <span className="font-semibold text-blue-600">
                  {currentEmail}
                </span>{" "}
                ingresando la{" "}
                <span className="font-semibold text-main dark:text-white">
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
        <form className="p-6">
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
