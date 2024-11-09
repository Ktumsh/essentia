"use client";

import { Button } from "@nextui-org/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { addYears, format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { SpinnerIcon } from "@/modules/icons/common";

import { usePaymentStatusPolling } from "../hooks/use-payment-status-polling";

interface PaymentFormProps {
  onClose: () => void;
  cardholderName: string;
  priceId: string;
}

const PaymentForm = ({
  onClose,
  cardholderName,
  priceId,
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { isPolling, startPolling } = usePaymentStatusPolling();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: cardholderName,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Error al confirmar el pago.");
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        startPolling(onClose);
      }
    } catch (err: any) {
      console.error("Error al confirmar el pago:", err);
      toast.error("Ocurrió un error al confirmar el pago.");
    } finally {
      setLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  const planDetails =
    priceId === siteConfig.planPrices.premium
      ? {
          plan: "Premium",
          amount: "9.500",
          frequency: "mes",
          connector: "el día",
          renewal: `${new Date().getDate()} cada mes`,
        }
      : {
          plan: "Premium Plus",
          amount: "91.200",
          frequency: "año",
          connector: "el",
          renewal: `${format(
            addYears(new Date(), 1),
            "dd 'de' MMMM 'de' yyyy",
            {
              locale: es,
            },
          )}`,
        };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex h-full flex-1 flex-col space-y-4"
    >
      <PaymentElement options={paymentElementOptions} />
      <p className="flex-1 text-sm text-main-m dark:text-main-dark-m">
        Al hacer clic en Confirmar comenzará tu suscripción al plan{" "}
        {planDetails.plan} de{" "}
        <span className="font-medium text-main dark:text-main-dark">
          ${planDetails.amount}
        </span>
        /{planDetails.frequency}, con fecha de renovación{" "}
        {planDetails.connector}{" "}
        <span className="font-medium text-main dark:text-main-dark">
          {planDetails.renewal}
        </span>
        .
      </p>
      <div className="!mt-0 inline-flex w-full flex-1 items-end justify-between pt-3 md:pt-6">
        <Button
          onPress={onClose}
          isDisabled={isLoading || isPolling}
          variant="light"
          className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-dark"
        >
          Cerrar
        </Button>
        <Button
          type="submit"
          isDisabled={!stripe || isLoading || !elements || isPolling}
          color="danger"
          startContent={
            isLoading || isPolling ? (
              <SpinnerIcon className="size-4 animate-spin" />
            ) : null
          }
          className="rounded-md"
        >
          {isLoading || isPolling ? "Procesando..." : "Agregar tarjeta y pagar"}
        </Button>
      </div>
    </motion.form>
  );
};

export default PaymentForm;
