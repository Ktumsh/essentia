"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface StripeWrapperProps {
  clientSecret: string | null;
  children: React.ReactNode;
}

const StripeWrapper = ({ clientSecret, children }: StripeWrapperProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const appearance = {
    theme: "stripe" as "stripe",
    variables: {
      colorPrimary: isDark ? "#c93560" : "#fa8072",
      colorBackground: isDark ? "#061b37" : "#f3f4f6",
      colorText: isDark ? "#cbd5e1" : "#212f3d",
      colorDanger: isDark ? "#c93560" : "#fa8072",
      borderRadius: "6px",
    },
    rules: {
      ".Input": {
        fontSize: "14px",
      },
      ".Label": {
        fontSize: "14px",
      },
      ".Error": {
        fontSize: "14px",
      },
    },
  };

  const options = clientSecret
    ? {
        clientSecret: clientSecret,
        appearance,
      }
    : undefined;

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
