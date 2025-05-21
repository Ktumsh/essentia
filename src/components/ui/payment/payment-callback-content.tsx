"use client";

import { CalendarCheck2, CalendarSync, Loader, Tag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { HomeIcon } from "@/components/icons/interface";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Separator } from "@/components/kit/separator";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import type { Payment } from "@/db/schema";

interface PaymentCallbackContentProps {
  title: string;
  message?: string;
  paymentDetails?: Payment;
  planType?: string;
  renewalDate?: Date | null;
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

const PaymentCallbackContent = ({
  title,
  message,
  paymentDetails,
  planType,
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

  const { amount, currency, processedAt } = paymentDetails || {};

  const titleColor = "text-success";

  if (isVerified === null) {
    return (
      <div className="text-foreground mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
        <Card className="bg-muted flex flex-col items-center text-center md:flex-row">
          <CardHeader>
            <CardDescription className="text-foreground inline-flex items-center gap-2">
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
      <div className="text-foreground mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
        <Card className="bg-muted flex flex-col items-center md:flex-row">
          <CardHeader>
            <CardDescription className="text-foreground inline-flex flex-col items-center gap-4 md:flex-row">
              <BadgeAlert variant="error" className="mb-0" />
              <div>
                <p>No se pudo verificar el estado del pago.</p>
                <p>Por favor, inténtalo más tarde.</p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="md:pt-6 md:pl-0">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="bg-background"
            >
              Volver a Essentia
              <HomeIcon />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (titleStatus === "canceled") {
    return (
      <div className="text-foreground mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
        <Card className="bg-muted flex flex-col items-center text-center md:flex-row">
          <CardHeader>
            <CardDescription className="inline-flex flex-col items-center gap-4 md:flex-row">
              <BadgeAlert variant="error" className="mb-0" />
              <p>El pago ha sido cancelado.</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="md:pt-6 md:pl-0">
            <Button
              variant="outline"
              className="bg-background"
              onClick={() => router.push("/")}
            >
              Volver al Panel Essentia
              <HomeIcon />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="text-foreground mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
      <BadgeAlert variant="success" />
      <h1
        className={cn("font-merriweather text-2xl font-semibold", titleColor)}
      >
        {title}
      </h1>
      {message && <p className="mt-2! text-center text-sm">{message}</p>}
      {titleStatus === "success" && paymentDetails && (
        <div className="w-full max-w-lg">
          <Card className="bg-muted">
            <CardHeader className="space-y-4">
              <CardTitle className="text-lg">Detalles del pago</CardTitle>
              <CardDescription className="flex flex-col space-y-6">
                <div className="inline-flex justify-between">
                  <div className="inline-flex items-center gap-2">
                    <Tag className="size-4" />
                    <span>Tipo de plan</span>
                  </div>
                  <span className="text-foreground">{planType}</span>
                </div>
                <div className="inline-flex justify-between">
                  <div className="inline-flex items-center gap-2">
                    <CalendarCheck2 className="size-4" />
                    <span>Fecha del pago</span>
                  </div>
                  <span className="text-foreground">
                    {formatDate(processedAt!, "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="inline-flex justify-between">
                  <div className="inline-flex items-center gap-2">
                    <CalendarSync className="size-4" />
                    <span>Próxima renovación</span>
                  </div>
                  <span className="text-foreground">
                    {formatDate(renewalDate!, "dd/MM/yyyy")}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardFooter className="bg-accent p-3 md:p-6">
              <div className="inline-flex w-full justify-between">
                <span className="font-merriweather text-lg font-semibold">
                  Total
                </span>{" "}
                <span className="font-merriweather text-lg font-semibold">
                  ${amount?.toLocaleString("es-CL")} {currency?.toUpperCase()}
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      <SparklesButton variant="gradient" onClick={() => router.push("/")}>
        Comenzar
      </SparklesButton>
    </div>
  );
};

export default PaymentCallbackContent;
