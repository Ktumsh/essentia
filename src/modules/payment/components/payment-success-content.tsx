"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import {
  CheckCircledIcon,
  CloseCircledIcon,
  SpinnerIcon,
} from "@/modules/icons/common";
import { motion } from "framer-motion";
import { cn } from "@/utils/common";

interface PaymentDetails {
  amount: number;
  currency: string;
  paymentDate: string;
}

interface PaymentSuccessContentProps {
  title: string;
  status: string;
  message?: string;
  paymentDetails: PaymentDetails | null;
  renewalDate?: string;
}

const getTitleStatus = (title: string): "success" | "failure" => {
  const lowerCaseTitle = title.toLowerCase();
  if (lowerCaseTitle.includes("exitoso")) {
    return "success";
  } else if (lowerCaseTitle.includes("fallido")) {
    return "failure";
  } else if (lowerCaseTitle.includes("error")) {
    return "failure";
  }
  return "success";
};

const successColors = [
  { color: "bg-white", size: 40, delay: 0 },
  { color: "bg-green-400 dark:bg-success-300", size: 60, delay: 0.1 },
  { color: "bg-green-300 dark:bg-success-200", size: 80, delay: 0.2 },
  { color: "bg-green-200 dark:bg-success-100", size: 100, delay: 0.3 },
  { color: "bg-green-100 dark:bg-success-50", size: 120, delay: 0.4 },
];

const failureColors = [
  { color: "bg-white", size: 40, delay: 0 },
  { color: "bg-red-400", size: 60, delay: 0.1 },
  { color: "bg-red-300", size: 80, delay: 0.2 },
  { color: "bg-red-200", size: 100, delay: 0.3 },
  { color: "bg-red-100", size: 120, delay: 0.4 },
];

const PaymentSuccessContent = ({
  title,
  status,
  message,
  paymentDetails,
  renewalDate,
}: PaymentSuccessContentProps) => {
  const router = useRouter();

  const titleStatus = getTitleStatus(title);

  const circles = titleStatus === "success" ? successColors : failureColors;

  const IconComponent =
    titleStatus === "success" ? CheckCircledIcon : CloseCircledIcon;

  const titleColor =
    titleStatus === "success" ? "text-success" : "text-red-600";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 text-base-color dark:text-base-color-dark">
      <div className="relative flex items-center justify-center size-[120px]">
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
            className={`${circle.color} rounded-full absolute flex items-center justify-center`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              zIndex: circles.length - index,
            }}
          >
            {index === 0 && (
              <IconComponent
                className={cn(
                  titleStatus === "success"
                    ? "text-green-600 dark:text-success"
                    : "text-red-600",
                  "size-12 scale-125"
                )}
              />
            )}
          </motion.div>
        ))}
      </div>

      <h1 className={cn("text-4xl font-extrabold", titleColor)}>
        {title.split("").map((character, index) => (
          <motion.span
            key={index}
            variants={{
              initial: {
                opacity: 0,
                x: -100,
              },
              animate: {
                opacity: 1,
                x: 0,
              },
            }}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.5,
              ease: "easeIn",
              delay: index * 0.05,
              staggerChildren: 0.05,
            }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </h1>

      {titleStatus === "success" && message && (
        <p className="font-semibold text-xl text-center">{message}</p>
      )}

      <p className="text-center text-base-color-h dark:text-base-color-dark-h">
        {status}
      </p>

      {paymentDetails && (
        <div className="w-full max-w-lg">
          <h2 className="text-sm uppercase font-bold px-5 lg:px-0 ml-3 text-base-color-h dark:text-base-color-dark">
            Detalles del Pago
          </h2>
          <Card
            fullWidth
            shadow="none"
            className="bg-gray-200 dark:bg-base-dark"
          >
            <CardBody className="p-3 md:p-6 space-y-4">
              <div className="inline-flex justify-between">
                <span>Plan premium</span>{" "}
                <span>
                  ${paymentDetails.amount.toLocaleString("es-CL")}{" "}
                  {paymentDetails.currency.toUpperCase()}
                </span>
              </div>
              <div className="inline-flex justify-between">
                <span>Fecha del Pago</span>
                <span>{paymentDetails.paymentDate}</span>
              </div>
              <div className="inline-flex justify-between">
                <span>Próxima Renovación</span>
                <span>{renewalDate}</span>
              </div>
            </CardBody>
            <div className="px-6">
              <Divider className="bg-black/10 dark:bg-white/10" />
            </div>
            <CardFooter className="p-3 md:p-6 flex-col">
              <div className="inline-flex justify-between w-full">
                <span className="font-semibold text-lg">Total</span>{" "}
                <span className="font-semibold font-sans text-lg">
                  ${paymentDetails.amount.toLocaleString("es-CL")}{" "}
                  {paymentDetails.currency.toUpperCase()}
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        <Button
          color="danger"
          onPress={() => router.push("/essentia-ai")}
          className="rounded-md"
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessContent;
