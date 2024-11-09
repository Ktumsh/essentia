"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { SpinnerIcon } from "@/modules/icons/common";
import { setUserPlan } from "@/modules/payment/pay/actions";
import ReasonCheckbox from "@/modules/premium/components/reason-checkbox";
import { Session } from "@/types/session";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  billingDetails: any;
}

const CancelSubscriptionModal = ({
  isOpen,
  onOpenChange,
  billingDetails,
}: CancelSubscriptionModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [cancelReason, setCancelReason] = useState<string>("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const subscription = billingDetails.subscription;
  const subscriptionItems = subscription.items.data[0].price;
  const planType = subscriptionItems.nickname ?? "N/A";

  const price = subscriptionItems.unit_amount.toLocaleString("es-CL");

  const renewalDate = format(
    new Date(subscription.current_period_end * 1000),
    "dd 'de' MMM, yyyy",
    { locale: es },
  );

  const handleSetFreePlan = async () => {
    const combinedReasons = [...selectedReasons, cancelReason]
      .filter(Boolean)
      .join(". ");
    try {
      startTransition(async () => {
        const result = await setUserPlan(
          session as Session,
          siteConfig.planPrices.free,
          combinedReasons,
        );

        if (result.success) {
          toast.success(result.message);
          router.refresh();
          onOpenChange();
        } else {
          toast.error("Hubo un error al actualizar tu plan.");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar tu plan.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="sm"
      size="lg"
      placement="center"
      hideCloseButton
      classNames={{
        backdrop: "z-[101] bg-black/80",
        wrapper: "z-[102] pointer-events-auto",
        base: "bg-white dark:bg-full-dark",
      }}
    >
      <ModalContent className="gap-6">
        {(onClose) => (
          <>
            <ModalHeader className="items-center border-b border-gray-200 p-6 dark:border-dark">
              <div className="flex-col">
                <h2 className="w-full whitespace-nowrap text-left text-xl font-semibold tracking-tight text-main dark:text-white sm:text-2xl">
                  ¿Estás seguro que quieres cancelar?
                </h2>
              </div>
            </ModalHeader>
            <div className="px-6 text-main-m dark:text-main-dark-m">
              <div className="flex w-full justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark dark:bg-dark/50">
                <span>
                  <span className="text-sm font-medium text-main dark:text-main-dark">
                    Plan {planType}
                  </span>
                  <span>
                    {" "}
                    - ${price}/{planType === "Premium Plus" ? "año" : "mes"}
                  </span>
                </span>
              </div>
            </div>
            <ModalBody className="p-6 !pt-0">
              <p className="text-sm text-main-h dark:text-main-dark-h">
                Tu plan permanecerá activo hasta el final de tu período de
                facturación actual, {renewalDate}. Después de esa fecha, tu plan
                cambiará a gratuito y perderás acceso a las funcionalidades
                Premium.
              </p>
              <div className="mt-4 flex flex-col gap-4 text-main dark:text-main-dark">
                <Divider className="my-0 bg-gray-200 dark:bg-dark" />
                <p className="text-sm">Nos gustaría saber por qué cancelas.</p>
                <ReasonCheckbox
                  selectedReasons={selectedReasons}
                  onChange={setSelectedReasons}
                />
                <Textarea
                  placeholder="Comparte con nosotros cómo podemos mejorar."
                  variant="bordered"
                  color="danger"
                  onValueChange={(value) => setCancelReason(value)}
                  classNames={{
                    inputWrapper:
                      "rounded-md border border-gray-200 dark:border-dark",
                  }}
                />
              </div>
              <div className="inline-flex w-full justify-between">
                <Button
                  variant="light"
                  onPress={onClose}
                  className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-dark"
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  isDisabled={isPending}
                  startContent={
                    isPending ? (
                      <SpinnerIcon className="size-4 animate-spin" />
                    ) : null
                  }
                  onPress={handleSetFreePlan}
                  className="rounded-md"
                >
                  {isPending ? "Cancelando plan" : "Confirmar"}
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelSubscriptionModal;
