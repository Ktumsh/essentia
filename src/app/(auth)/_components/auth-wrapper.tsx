"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import AuthFooter from "./auth-footer";
import AuthHeader from "./auth-header";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isLogin = pathname.startsWith("/login");
  const isSignup = pathname.startsWith("/signup");

  const variants = {
    initialLogin: { opacity: 0, x: -30 },
    animateLogin: { opacity: 1, x: 0 },
    exitLogin: { opacity: 0, x: 30 },
    initialSignup: { opacity: 0, x: 30 },
    animateSignup: { opacity: 1, x: 0 },
    exitSignup: { opacity: 0, x: -30 },
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="before:absolute before:top-1/6 before:left-2/3 before:block before:size-96 before:-translate-x-1/2 before:scale-150 before:rounded-full before:bg-linear-to-tr/shorter before:from-transparent before:to-indigo-300 before:blur-2xl after:absolute after:top-1/3 after:left-1/4 after:z-10 after:block after:size-96 after:rounded-full after:bg-linear-to-tr/shorter after:from-fuchsia-300 after:to-transparent after:blur-2xl dark:before:to-indigo-900 dark:after:from-fuchsia-950 dark:after:to-transparent" />
      </motion.div>
      <AuthHeader />
      <div className="z-40 min-h-dvh w-full sm:min-h-dvh">
        <div className="flex min-h-dvh w-full items-center justify-center">
          {isLogin ? (
            <motion.div
              key="login"
              initial="initialLogin"
              animate="animateLogin"
              exit="exitLogin"
              variants={variants}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="flex size-full flex-col px-4 sm:w-auto"
            >
              {children}
            </motion.div>
          ) : isSignup ? (
            <motion.div
              key="signup"
              initial="initialSignup"
              animate="animateSignup"
              exit="exitSignup"
              variants={variants}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="flex size-full flex-col px-4 sm:w-auto"
            >
              {children}
            </motion.div>
          ) : (
            children
          )}
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthWrapper;
