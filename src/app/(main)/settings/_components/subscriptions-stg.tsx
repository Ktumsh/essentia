"use client";

import {
  ArrowLeft,
  Banknote,
  Calendar1,
  CalendarClock,
  CalendarSync,
  CircleDollarSign,
  HandCoins,
  History,
  Loader,
  RefreshCcw,
  Stars,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/kit/button";
import { Label } from "@/components/kit/label";
import { Switch } from "@/components/kit/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/kit/table";
import { BetterTooltip } from "@/components/kit/tooltip";
import { CheckCircledIcon } from "@/components/ui/icons/common";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { FEATURE_PLAN_DATA } from "@/consts/feature-plan-data";
import { Payment, Subscription } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { PaymentHistory } from "@/types/common";
import { formatDate } from "@/utils/format";

import InfoField from "./info-field";
import SettingsOptsHeader from "./settings-opts-header";
import CancelSubscriptionModal from "../../(account)/_components/subscription/cancel-subscription-modal";
import {
  getPaymentStatus,
  getPlanStatus,
  getPlanType,
} from "../../(account)/_lib/utils";

type Section =
  | "planState"
  | "planUpdate"
  | "payHistory"
  | "benefits"
  | "options";

interface SubscriptionsStgProps {
  subscription: Subscription | null;
  payment: Payment | null;
  paymentHistory: PaymentHistory[];
}

const SubscriptionsStg = ({
  subscription,
  payment,
  paymentHistory,
}: SubscriptionsStgProps) => {
  const [section, setSection] = useState<Section>("options");
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  const [showBasicPlan, setShowBasicPlan] = useState<boolean>(false);

  const router = useRouter();

  const isMobile = useIsMobile();

  const { amount, currency } = payment || {};
  const { type, expiresAt, status, isPremium } = subscription || {};

  const planType = getPlanType(type!);

  const planStatus = getPlanStatus(status!);

  const isCanceled = status === "canceled";

  const price = isPremium ? amount?.toLocaleString("es-CL") : "No aplica";

  const startDate =
    paymentHistory.length > 0
      ? formatDate(paymentHistory[0].payment.processedAt!, "d 'de' MMMM, yyyy")
      : "No aplica";

  const endDate = isPremium
    ? formatDate(expiresAt!, "d 'de' MMMM, yyyy")
    : "No aplica";

  const basicFeatures = FEATURE_PLAN_DATA["free"].feature;

  const premiumFeatures = FEATURE_PLAN_DATA["premium"].feature.slice(1);

  const premiumPlusFeatures =
    FEATURE_PLAN_DATA["premium-plus"].feature.slice(1);

  const planFeatures =
    type === "premium-plus"
      ? [...premiumFeatures, ...premiumPlusFeatures]
      : premiumFeatures;

  const basicLabel = showBasicPlan
    ? "Ocultar beneficios básicos"
    : "Mostrar beneficios básicos";

  const handleSection = (section: Section) => {
    setSection(section);
  };

  return (
    <div className="-mx-6 md:mx-0">
      {section === "options" ? (
        isMobile ? (
          <div className="relative px-6">
            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className="absolute top-7 left-4 md:left-0"
              onClick={() => router.push("/settings")}
            >
              <ArrowLeft className="text-foreground/80 size-5!" />
            </Button>
            <div className="ml-12">
              <SettingsOptsHeader title="Suscripciones" />
            </div>
          </div>
        ) : (
          <SettingsOptsHeader
            title="Suscripciones"
            description="Configura y gestiona tus suscripciones."
          />
        )
      ) : (
        <div className="relative px-6 md:px-0">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="absolute top-7 left-4 md:left-0"
            onClick={() => handleSection("options")}
          >
            <ArrowLeft className="text-foreground/80 size-5!" />
          </Button>
          <div className="ml-12">
            <SettingsOptsHeader title="Suscripciones" />
          </div>
        </div>
      )}
      <div className="mt-1 flex flex-1 flex-col">
        {section === "options" && (
          <div className="flex flex-col gap-1">
            <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
              <InfoField
                title="Estado del plan"
                icon={Loader}
                isButton
                hasValue={false}
                buttonAction={() => handleSection("planState")}
              />
              <InfoField
                title="Actualización del plan"
                icon={RefreshCcw}
                isButton
                hasValue={false}
                buttonAction={() => handleSection("planUpdate")}
              />
              <InfoField
                title="Historial de pagos"
                icon={History}
                isButton
                hasValue={false}
                buttonAction={() => handleSection("payHistory")}
              />
              <InfoField
                title="Beneficios premium"
                icon={Stars}
                isButton
                hasValue={false}
                buttonAction={() =>
                  isPremium ? handleSection("benefits") : router.push("/planes")
                }
              />
            </ul>
          </div>
        )}
        {section === "planState" && (
          <>
            <div className="flex flex-col">
              <h4 className="text-foreground/80-h mb-2 pl-6 text-xs font-medium md:pl-4">
                Estado de suscripción
              </h4>
              <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
                <InfoField title="Plan actual" value={planType} />
                <InfoField
                  title={`Precio/${planType === "Premium Plus" ? "Año" : "Mes"}`}
                  value={price}
                  icon={CircleDollarSign}
                  suffix={currency?.toUpperCase()}
                  hasBorder
                />
                <InfoField
                  title="Fecha de inicio"
                  value={startDate}
                  icon={Calendar1}
                  hasBorder
                />
                <InfoField
                  title="Fecha de finalización/renovación"
                  value={endDate}
                  icon={CalendarSync}
                />
                <InfoField
                  title="Estado de la suscripción"
                  value={planStatus}
                  icon={Loader}
                  hasBorder
                />
              </ul>
            </div>
            {isCanceled && (
              <div className="text-foreground/80 mt-4 space-y-1 px-6 text-sm md:px-0">
                <p className="text-red-500">
                  Tu plan ha sido cancelado y perderás acceso a las
                  funcionalidades Premium a partir de la fecha de finalización.
                </p>
                <p>
                  Si deseas reactivar tu plan, puedes hacerlo una vez haya
                  finalizado.
                </p>
              </div>
            )}
          </>
        )}
        {section === "planUpdate" && (
          <>
            <div className="flex flex-col">
              <h4 className="text-foreground/80-h mb-2 pl-6 text-xs font-medium md:pl-4">
                Actualización de plan
              </h4>
              <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
                <InfoField
                  title="Cambiar plan"
                  value={planType}
                  isButton
                  buttonAction={() => setIsOpenPayment(true)}
                />
                {isPremium && !isCanceled && (
                  <InfoField
                    title="Cancelar suscripción"
                    value="Tu suscripción se cancelará al final del ciclo de facturación actual."
                    isButton
                    isDanger
                    buttonAction={() => setIsOpenCancel(true)}
                  />
                )}
              </ul>
            </div>
            {payment && (
              <>
                <CancelSubscriptionModal
                  isOpen={isOpenCancel}
                  setIsOpen={setIsOpenCancel}
                  payment={payment}
                  subscription={subscription}
                />
              </>
            )}
            <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
          </>
        )}
        {section === "payHistory" && (
          <>
            <div className="flex flex-col">
              <h4 className="text-foreground/80-h mb-2 pl-6 text-xs font-medium md:pl-4">
                Historial de pagos
              </h4>
              <div className="border-border flex flex-col overflow-hidden border-y px-6 md:rounded-lg md:border md:px-0">
                {paymentHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground/80-h pl-2 md:pl-3">
                          <div className="flex items-center gap-1.5">
                            <CalendarClock className="size-3" />

                            <span className="text-nowrap">Fecha del pago</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-foreground/80-h">
                          <div className="flex items-center gap-1.5">
                            <HandCoins className="size-3" />
                            <span className="text-nowrap">Monto</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-foreground/80-h">
                          <div className="flex items-center gap-1.5">
                            <Banknote className="size-3" />
                            <span className="text-nowrap">Divisa</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-foreground/80-h">
                          <div className="flex items-center gap-1.5">
                            <Stars className="size-3" />

                            <span className="text-nowrap">Plan</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-foreground/80-h pr-2 md:pl-3">
                          <div className="flex items-center gap-1.5">
                            <Loader className="size-3" />
                            <span className="text-nowrap">Estado</span>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((data) => (
                        <TableRow key={data.payment.id}>
                          <TableCell className="pl-2 md:pl-3">
                            {formatDate(
                              data.payment.processedAt!,
                              "dd/MM/yyyy",
                            )}
                          </TableCell>
                          <TableCell>
                            {data.payment.amount?.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {data.payment.currency?.toUpperCase()}
                          </TableCell>
                          <TableCell>{getPlanType(data.type!)}</TableCell>
                          <TableCell className="pr-2 md:pl-3">
                            {getPaymentStatus(data.payment.status!)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-10 text-center">
                    <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
                      <History className="size-8" />
                      <p className="text-xs md:text-sm">
                        Aún no tienes pagos registrados. ¡Actualiza tu plan para
                        visualizar tu historial de pagos!
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setIsOpenPayment(true)}
                        className="h-fit p-0 text-sm font-medium text-blue-500 hover:underline"
                      >
                        Hazte premium
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
          </>
        )}
        {section === "benefits" && isPremium && (
          <div className="relative flex flex-col">
            <h4 className="text-foreground/80-h mb-2 pl-6 text-xs font-medium md:pl-4">
              Beneficios premium
            </h4>
            <div className="absolute top-0 right-6 md:right-0">
              <BetterTooltip content={basicLabel}>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-mode"
                    aria-label={basicLabel}
                    checked={showBasicPlan}
                    onCheckedChange={setShowBasicPlan}
                    thumbClass="size-4"
                    className="h-5 w-10"
                  >
                    <span className="sr-only">{basicLabel}</span>
                  </Switch>
                  <Label htmlFor="show-mode">Beneficios básicos</Label>
                </div>
              </BetterTooltip>
            </div>
            <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
              {showBasicPlan && (
                <ul className="grid gap-3 px-6 py-3 md:px-4 md:py-2">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="text-sm">
                      <div className="flex flex-1 items-center justify-start gap-3 tabular-nums">
                        <div className="after:bg-background relative flex items-center justify-center rounded-full after:absolute after:inset-1 after:-z-10 after:rounded-full after:content-['']">
                          <CheckCircledIcon className="inline-flex size-5 shrink-0 text-emerald-400" />
                        </div>
                        <span className="text-foreground/80 text-left">
                          {feature}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <ul
                className={cn("grid gap-3 px-6 py-3 md:px-4 md:py-2", {
                  "border-border border-t": showBasicPlan,
                })}
              >
                {planFeatures.map((feature, index) => (
                  <li key={index} className="text-sm">
                    <div className="flex flex-1 items-center justify-start gap-3 tabular-nums">
                      <div className="after:bg-background relative flex items-center justify-center rounded-full after:absolute after:inset-1 after:-z-10 after:rounded-full after:content-['']">
                        <CheckCircledIcon className="inline-flex size-5 shrink-0 text-emerald-400" />
                      </div>
                      <span className="text-foreground/80 text-left">
                        {feature}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsStg;
