"use client";

import { Elements } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";

interface StripeWrapperProps {
  stripe: any;
  clientSecret?: string | null;
  children: React.ReactNode;
}

const StripeWrapper = ({
  stripe,
  clientSecret,
  children,
}: StripeWrapperProps) => {
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
        clientSecret,
        appearance,
      }
    : undefined;

  return (
    clientSecret && (
      <Elements stripe={stripe} options={options}>
        {children}
      </Elements>
    )
  );
};

export default StripeWrapper;
