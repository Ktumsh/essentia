"use client";

import { Loader } from "lucide-react";

import { Button } from "@/components/kit/button";

export function SubmitButton({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending?: boolean;
}) {
  return (
    <Button
      type={isPending ? "button" : "submit"}
      radius="full"
      variant="alternative"
      aria-disabled={isPending}
      disabled={isPending}
      className="dark:border-background relative h-10 w-full border border-white shadow-sm md:border-0 md:shadow-none"
    >
      {isPending && <Loader className="size-4 animate-spin" />}

      {!isPending && children}

      <output aria-live="polite" className="sr-only">
        {isPending ? "Cargando" : "Enviar formulario"}
      </output>
    </Button>
  );
}
