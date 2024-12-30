"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { addYears, format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "motion/react";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { siteConfig } from "@/config/site";
import { SpinnerIcon } from "@/modules/icons/common";

import { usePaymentStatusPolling } from "../hooks/use-payment-status-polling";

interface PaymentFormProps {
  onClose: (isOpen: boolean) => void;
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
    >
      <div className="flex h-full flex-1 flex-col space-y-4 p-6">
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
      </div>
      <DialogFooter isSecondary>
        <DialogClose asChild>
          <Button disabled={isLoading || isPolling} variant="outline">
            Cerrar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!stripe || isLoading || !elements || isPolling}
          variant="destructive"
        >
          {isLoading || isPolling ? (
            <SpinnerIcon className="size-4 animate-spin" />
          ) : null}
          {isLoading || isPolling ? "Procesando..." : "Agregar tarjeta y pagar"}
        </Button>
      </DialogFooter>
    </motion.form>
  );
};

export default PaymentForm;
