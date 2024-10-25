"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import AuthFooter from "@/modules/auth/components/auth-footer";
import AuthHeader from "@/modules/auth/components/auth-header";
import { cn } from "@/utils/common";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const logout = pathname.startsWith("/logout");
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          aria-hidden="true"
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        >
          <div
            className={cn(
              "z-[-1]",
              "before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-['']",
              "before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-20",
              "after:absolute after:top-[10%] after:left-[20%] after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-50",
              "after:dark:top-1/4 after:dark:left-2/3 after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-base-full-dark after:dark:via-[#ff7373] after:dark:opacity-50 after:dark:blur-3xl after:dark:rounded-none"
            )}
          ></div>
        </motion.div>
        {!logout && <AuthHeader />}
        {children}
        {!logout && <AuthFooter />}
      </div>
    </>
  );
}
