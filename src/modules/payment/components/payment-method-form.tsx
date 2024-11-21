"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { SpinnerIcon } from "@/modules/icons/common";

import { updatePaymentMethod } from "../pay/actions";

interface PaymentMethodFormProps {
  customerId: string;
  onClose: (isOpen: boolean) => void;
}

const PaymentMethodForm = ({ customerId, onClose }: PaymentMethodFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      console.error("Error al confirmar el método de pago:", error);
      setIsLoading(false);
    } else if (setupIntent?.payment_method) {
      try {
        await updatePaymentMethod(
          customerId,
          setupIntent.payment_method as string,
        );
        setIsLoading(false);
        toast.success("Método de pago actualizado correctamente.");
        onClose(false);
      } catch (err) {
        toast.error("Error actualizando el método de pago.");
        console.error("Error actualizando el método de pago en Stripe:", err);
        setIsLoading(false);
      }
    } else {
      toast.error(
        "No se obtuvo un método de pago después de confirmar el SetupIntent.",
      );
      console.error(
        "No se obtuvo un método de pago después de confirmar el SetupIntent.",
      );
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-1 flex-col space-y-4"
    >
      <PaymentElement />
      <DialogFooter>
        <Button
          onClick={() => onClose(false)}
          disabled={isLoading}
          variant="ghost"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="destructive"
          disabled={!stripe || isLoading || !elements}
        >
          {isLoading ? <SpinnerIcon className="size-4 animate-spin" /> : null}
          {isLoading ? "Procesando..." : "Agregar tarjeta"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default PaymentMethodForm;
