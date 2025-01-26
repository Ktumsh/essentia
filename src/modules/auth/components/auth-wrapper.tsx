"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/common";

import AuthFooter from "./auth-footer";
import AuthHeader from "./auth-header";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isLogin = pathname.startsWith("/login");
  const isSignup = pathname.startsWith("/signup");
  const isLogout = pathname.startsWith("/logout");

  const variants = {
    initialLogin: { opacity: 0, x: -30 },
    animateLogin: { opacity: 1, x: 0 },
    exitLogin: { opacity: 0, x: 30 },
    initialSignup: { opacity: 0, x: 30 },
    animateSignup: { opacity: 1, x: 0 },
    exitSignup: { opacity: 0, x: -30 },
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className={cn(
            "z-[-1]",
            "from-gray-50 to-[#c0c6e6] before:absolute before:left-1/2 before:top-0 before:h-[800px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr before:blur-[80px] before:content-[''] sm:before:w-[1080px]",
            "before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-20",
            "after:absolute after:left-[20%] after:top-[10%] after:z-10 after:h-[580px] after:w-full after:rounded-full after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:opacity-50 after:blur-[80px] after:content-[''] sm:after:w-[540px]",
            "after:dark:left-2/3 after:dark:top-1/4 after:dark:h-[180px] after:dark:w-[260px] after:dark:rounded-none after:dark:bg-gradient-to-br after:dark:from-full-dark after:dark:via-[#ff7373] after:dark:opacity-50 after:dark:blur-3xl",
          )}
        ></div>
      </motion.div>
      {!isLogout && <AuthHeader />}
      <div className="relative size-full">
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
                className="z-20 flex size-full flex-col sm:w-auto"
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
                className="z-20 flex size-full flex-col sm:w-auto"
              >
                {children}
              </motion.div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
      {!isLogout && <AuthFooter />}
    </div>
  );
};

export default AuthWrapper;
