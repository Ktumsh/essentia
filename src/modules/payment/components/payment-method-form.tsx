"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

import { updatePaymentMethod } from "../pay/actions";

interface PaymentMethodFormProps {
  customerId: string;
  onClose: (isOpen: boolean) => void;
}

const PaymentMethodForm = ({ customerId, onClose }: PaymentMethodFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();

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
    <form onSubmit={handleSubmit}>
      <div className="flex h-full flex-1 flex-col space-y-4 p-6">
        <PaymentElement />
      </div>

      {isMobile ? (
        <DrawerFooter>
          <DrawerClose asChild>
            <Button disabled={isLoading} variant="secondary">
              Cancelar
            </Button>
          </DrawerClose>
          <Button
            type="submit"
            variant="destructive"
            disabled={!stripe || isLoading || !elements}
          >
            {isLoading ? <Loader className="size-4 animate-spin" /> : null}
            {isLoading ? "Procesando..." : "Agregar tarjeta"}
          </Button>
        </DrawerFooter>
      ) : (
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button disabled={isLoading} variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            disabled={!stripe || isLoading || !elements}
          >
            {isLoading ? <Loader className="size-4 animate-spin" /> : null}
            {isLoading ? "Procesando..." : "Agregar tarjeta"}
          </Button>
        </DialogFooter>
      )}
    </form>
  );
};

export default PaymentMethodForm;
