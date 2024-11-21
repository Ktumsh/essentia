"use client";

import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

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
      className="relative h-10 w-full"
    >
      {isPending && <Loader className="size-4 animate-spin" />}

      {children}

      <output aria-live="polite" className="sr-only">
        {isPending ? "Cargando" : "Enviar formulario"}
      </output>
    </Button>
  );
}
