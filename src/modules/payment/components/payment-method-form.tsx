"use client";

import { Button } from "@nextui-org/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

import { SpinnerIcon } from "@/modules/icons/common";

import { updatePaymentMethod } from "../pay/actions";

interface PaymentMethodFormProps {
  customerId: string;
  onClose: () => void;
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
        onClose();
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
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex h-full flex-1 flex-col space-y-4"
    >
      <PaymentElement />
      <div className="!mt-0 inline-flex w-full flex-1 items-end justify-between pt-3 md:pt-6">
        <Button
          onPress={onClose}
          isDisabled={isLoading}
          variant="light"
          className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-dark"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          isDisabled={!stripe || isLoading || !elements}
          color="danger"
          startContent={
            isLoading ? <SpinnerIcon className="size-4 animate-spin" /> : null
          }
          className="rounded-md"
        >
          {isLoading ? "Procesando..." : "Agregar tarjeta"}
        </Button>
      </div>
    </motion.form>
  );
};

export default PaymentMethodForm;
