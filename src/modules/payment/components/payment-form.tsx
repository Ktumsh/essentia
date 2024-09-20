"use client";

import { SpinnerIcon } from "@/modules/icons/common";
import { Button } from "@nextui-org/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface PaymentFormProps {
  onClose: () => void;
}

export const PaymentForm = ({ onClose }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [nextRenewalDay, setNextRenewalDay] = useState<number | null>(null);

  const calculateRenewalDay = () => {
    const today = new Date();
    return today.getDate();
  };

  useEffect(() => {
    setNextRenewalDay(calculateRenewalDay());
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_PUBLIC_API_URL}/payment-success`
            : "http://localhost:3000/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message ?? "Ocurrió un problema con el pago.");
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Pago realizado con éxito.");
      onClose();
      window.location.href = `/payment-success?payment_intent=${paymentIntent.id}`;
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as "tabs",
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      onSubmit={handleSubmit}
    >
      <PaymentElement options={paymentElementOptions} />
      <p className="mb-2 mt-4 text-sm text-base-color-m dark:text-base-color-dark-m">
        Al hacer clic en Confirmar comenzará tu suscripción al plan Premium de{" "}
        <span className="font-medium text-base-color dark:text-base-color-dark">
          $5.000/mes,{" "}
        </span>
        con fecha de renovación el día{" "}
        <span className="font-medium text-base-color dark:text-base-color-dark">
          {nextRenewalDay && (
            <span className="font-medium text-base-color dark:text-base-color-dark">
              {nextRenewalDay} de cada mes
            </span>
          )}
        </span>
        .
      </p>
      <div className="inline-flex justify-between w-full pt-3 md:pt-6">
        <Button
          onPress={onClose}
          isDisabled={isLoading}
          variant="light"
          className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-dark"
        >
          Cerrar
        </Button>
        <Button
          type="submit"
          isDisabled={isLoading || !stripe || !elements}
          color="danger"
          startContent={
            isLoading ? <SpinnerIcon className="size-4 animate-spin" /> : null
          }
          className="rounded-md"
        >
          {isLoading ? "Procesando..." : "Agregar tarjeta y pagar"}
        </Button>
      </div>
    </motion.form>
  );
};
