"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SpinnerIcon } from "@/components/ui/icons/status";
import useSubscription from "@/hooks/use-subscription";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUserSubscription } from "@/hooks/use-user-subscription";

const LogoutPage = () => {
  const router = useRouter();
  const { setUser } = useUserProfile();
  const { setSubscription } = useSubscription();
  const { setSubscription: setUserSubscription } = useUserSubscription();

  useEffect(() => {
    setTimeout(() => {
      setUser(null);
      setUserSubscription(null);
      setSubscription(null);
      router.push("/login");
    }, 1000);
  }, [router, setUser, setSubscription, setUserSubscription]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      aria-hidden="true"
      className="flex min-h-dvh flex-col items-center justify-center gap-2"
    >
      <span>
        <SpinnerIcon
          className="text-muted-foreground size-8"
          aria-hidden="true"
        />
      </span>
      <h1 className="text-foreground text-center text-2xl font-semibold">
        Cerrando sesión
      </h1>
    </motion.div>
  );
};

export default LogoutPage;
