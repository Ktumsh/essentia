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
            "from-gray-50 to-[#c0c6e6] before:absolute before:left-1/2 before:top-0 before:h-[800px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-linear-to-tr before:blur-[80px] before:content-[''] sm:before:w-[1080px]",
            "dark:before:h-[600px] dark:before:w-[980px] dark:before:bg-linear-to-br dark:before:from-transparent dark:before:to-[#ff7373] dark:before:opacity-20",
            "after:absolute after:left-[20%] after:top-[10%] after:z-10 after:h-[580px] after:w-full after:rounded-full after:bg-linear-to-tr after:from-[#f8b6cc] after:to-transparent after:opacity-50 after:blur-[80px] after:content-[''] sm:after:w-[540px]",
            "dark:after:left-2/3 dark:after:top-1/4 dark:after:h-[180px] dark:after:w-[260px] dark:after:rounded-none dark:after:bg-linear-to-br dark:after:from-full-dark dark:after:via-[#ff7373] dark:after:opacity-50 dark:after:blur-3xl",
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
