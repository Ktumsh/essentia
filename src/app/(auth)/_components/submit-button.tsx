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
      size="lg"
      aria-disabled={isPending}
      disabled={isPending}
      className="mb-0! w-full"
    >
      {isPending ? <Loader className="size-4 animate-spin" /> : children}
      <output aria-live="polite" className="sr-only">
        {isPending ? "Cargando" : "Enviar formulario"}
      </output>
    </Button>
  );
}
