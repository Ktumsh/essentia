"use client";

import React, { FC, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/utils/common";
import ButtonUp from "../ui/buttons/button-up";
import AsideMenu from "../ui/layout/aside-menu";
import AsideTabs from "../ui/layout/aside.tabs";
import { startsWithAny } from "../../lib/utils";
import useWindowSize from "../../hooks/use-window-size";

const HIDDEN_ASIDE_PATHS = [
  "/essentia-ai",
  "/share",
  "/premium",
  "/profile",
  "/account",
];
const HIDDEN_BUTTON_UP_PATHS = ["/essentia-ai"];

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const windowSize = useWindowSize();

  const hideAside = startsWithAny(pathname, HIDDEN_ASIDE_PATHS);
  const hideButtonUp = startsWithAny(pathname, HIDDEN_BUTTON_UP_PATHS);
  const isProfile = pathname.startsWith("/profile");
  const isAccount = pathname.startsWith("/account");
  const isPremium = pathname.startsWith("/premium");
  const isEssentiaAI = pathname.startsWith("/essentia-ai");
  const isShare = pathname.startsWith("/share");
  const isAIorShare = isEssentiaAI || isShare;

  // Backgrounds
  const backgroundClasses = useMemo(() => {
    if (!isPremium && !isProfile && !isAccount) {
      return cn(
        "z-[-1]",
        "before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-[''] before:opacity-0 md:before:opacity-100",
        "before:dark:h-[300px] sm:before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-0 md:before:dark:opacity-20",
        "after:absolute after:top-[10%] after:left-[20%] after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-0 md:after:opacity-50",
        "after:dark:top-1/4 after:dark:left-2/3 after:dark:h-[80px] sm:after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-base-full-dark after:dark:via-[#ff7373] after:dark:opacity-0 md:after:dark:opacity-50 after:dark:blur-3xl after:dark:rounded-none",
        isAIorShare &&
          "after:!opacity-0 before:!opacity-100 after:dark:!opacity-50 before:dark:!opacity-20"
      );
    } else {
      return cn(
        "z-[-1]",
        "before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-t from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-['']",
        "before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-b before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-50",
        "after:absolute after:top-[10%] after:left-1/2 after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:-translate-x-1/2 after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-100",
        "after:dark:top-1/4 after:dark:left-1/2 after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-base-full-dark after:dark:via-[#ff7373] after:dark:opacity-80 after:dark:blur-3xl after:dark:rounded-none"
      );
    }
  }, [isPremium, isProfile, isAccount, isAIorShare]);

  // Motion classes
  const motionContainerClasses = cn(
    "fixed inset-0 z-0 overflow-hidden pointer-events-none",
    isPremium && "absolute inset-0"
  );

  return (
    <>
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        aria-hidden="true"
        className={motionContainerClasses}
      >
        <div className={backgroundClasses}></div>
      </motion.div>

      {/* Main content */}
      <div className="relative w-full overflow-clip">
        <div className="flex min-h-screen w-full">
          {!hideAside && windowSize.width > 768 && <AsideMenu />}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="flex flex-col flex-grow items-center w-full"
          >
            {children}
          </motion.div>
          {!hideAside && windowSize.width > 768 && <AsideTabs />}
        </div>
      </div>

      {/* Button Up */}
      {!hideButtonUp && windowSize.width > 768 && <ButtonUp />}
    </>
  );
};

export default LayoutWrapper;
