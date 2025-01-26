"use client";

import { Loader } from "lucide-react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircledIcon, CloseCircledIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";
import { formatDate } from "@/utils/format";

import type { Payment } from "@/db/schema";

interface PaymentCallbackContentProps {
  title: string;
  message?: string;
  paymentDetails: Payment;
  renewalDate: Date | null;
}

const getTitleStatus = (title: string): "success" | "canceled" | "failure" => {
  const lowerCaseTitle = title.toLowerCase();
  if (lowerCaseTitle.includes("gracias")) {
    return "success";
  } else if (lowerCaseTitle.includes("cancelada")) {
    return "canceled";
  } else {
    return "failure";
  }
};

const successColors = [
  { color: "bg-white", size: 40, delay: 0 },
  { color: "bg-green-400 dark:bg-success-300", size: 60, delay: 0.1 },
  { color: "bg-green-300 dark:bg-success-200", size: 80, delay: 0.2 },
  { color: "bg-green-200 dark:bg-success-100", size: 100, delay: 0.3 },
  { color: "bg-green-100 dark:bg-success-50", size: 120, delay: 0.4 },
];

const PaymentCallbackContent = ({
  title,
  message,
  paymentDetails,
  renewalDate,
}: PaymentCallbackContentProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const session_id = params.get("session_id");

  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const titleStatus = getTitleStatus(title);

  useEffect(() => {
    if (titleStatus === "canceled") {
      setIsVerified(true);
      return;
    }

    if (!session_id) {
      setIsVerified(false);
      return;
    }

    const verifySession = async () => {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id }),
        });

        if (!response.ok) {
          throw new Error("Error al verificar el pago.");
        }

        const { success } = await response.json();
        setIsVerified(success);
      } catch {
        setIsVerified(false);
      }
    };

    verifySession();
  }, [session_id, titleStatus]);

  const { amount, currency, processedAt } = paymentDetails;

  const circles = successColors;

  const IconComponent =
    titleStatus === "success" ? CheckCircledIcon : CloseCircledIcon;

  const titleColor = "text-success";

  if (isVerified === null) {
    return (
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-main dark:text-main-dark">
        <Card className="flex flex-col items-center text-center dark:bg-dark/30 md:flex-row">
          <CardHeader>
            <CardDescription className="inline-flex items-center gap-2 dark:text-white">
              <p>Verificando el estado del pago</p>
              <Loader className="size-4 animate-spin" />
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-main dark:text-main-dark">
        <Card className="flex flex-col items-center text-center dark:bg-dark/30 md:flex-row">
          <CardHeader>
            <CardDescription className="dark:text-white">
              <p>No se pudo verificar el estado del pago.</p>
              <p>Por favor, inténtalo más tarde.</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="md:pl-0 md:pt-6">
            <Button variant="outline" onClick={() => router.push("/")}>
              Volver a Essentia
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (titleStatus === "canceled") {
    return (
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-main dark:text-main-dark">
        <Card className="flex flex-col items-center text-center dark:bg-dark/30 md:flex-row">
          <CardHeader>
            <CardDescription className="inline-flex flex-col items-center gap-2 dark:text-white md:flex-row">
              <CloseCircledIcon className="text-red-500" />
              <p>El pago ha sido cancelado.</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="md:pl-0 md:pt-6">
            <Button variant="outline" onClick={() => router.push("/")}>
              Volver a Essentia
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-main dark:text-main-dark">
      <div className="relative flex size-[120px] items-center justify-center">
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: 1,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.6,
              delay: circle.delay,
            }}
            className={`${circle.color} absolute flex items-center justify-center rounded-full`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              zIndex: circles.length - index,
            }}
          >
            {index === 0 && (
              <IconComponent className="size-12 scale-125 text-green-600 dark:text-success" />
            )}
          </motion.div>
        ))}
      </div>

      <h1 className={cn("text-2xl font-semibold", titleColor)}>{title}</h1>

      {message && <p className="!mt-2 text-center text-sm">{message}</p>}

      {titleStatus === "success" && paymentDetails && (
        <div className="w-full max-w-lg">
          <Card className="dark:bg-dark/30 dark:text-white">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">Detalles del pago</CardTitle>
              <CardDescription className="flex flex-col space-y-2">
                <div className="inline-flex justify-between">
                  <span>Plan premium</span>{" "}
                  <span>
                    ${amount?.toLocaleString("es-CL")} {currency?.toUpperCase()}
                  </span>
                </div>
                <div className="inline-flex justify-between">
                  <span>Fecha del Pago</span>
                  <span>{formatDate(processedAt!, "dd/MM/yyyy")}</span>
                </div>
                <div className="inline-flex justify-between">
                  <span>Próxima Renovación</span>
                  <span>{formatDate(renewalDate!, "dd/MM/yyyy")}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <Separator />
            <CardFooter className="p-3 md:p-6">
              <div className="inline-flex w-full justify-between">
                <span className="text-lg font-semibold">Total</span>{" "}
                <span className="text-lg font-semibold">
                  ${amount?.toLocaleString("es-CL")} {currency?.toUpperCase()}
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      <Button
        variant="outline"
        onClick={() => {
          if (titleStatus === "success") {
            router.push("/essentia-ai");
          } else {
            router.push("/");
          }
        }}
      >
        {titleStatus === "success" ? "Comenzar ahora" : "Volver a Essentia"}
      </Button>
    </div>
  );
};

export default PaymentCallbackContent;
