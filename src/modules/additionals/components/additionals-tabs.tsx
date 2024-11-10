"use client";

import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  EmergenciesIcon,
  GuidesIcon,
  LinksIcon,
  RecommendationsIcon,
} from "@/modules/icons/miscellaneus";

import Emergencies from "./emergencies";
import Guides from "./guides";
import Links from "./links";
import Recommendations from "./recommendations";

export default function AdditionalsTabs() {
  const pathname = usePathname();
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabListRef.current) {
      const activeTab = tabListRef.current.querySelector(
        `[data-key="${pathname}"]`,
      );
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [pathname]);

  return (
    <div className="flex size-full flex-col">
      <Tabs
        ref={tabListRef}
        selectedKey={pathname}
        aria-label="Options"
        variant="underlined"
        fullWidth
        classNames={{
          base: "z-10 z-0",
          tabList:
            "p-0 mx-6 gap-6 rounded-none border-b border-gray-200 dark:border-dark",
          cursor: "w-full bg-bittersweet-400 dark:bg-cerise-red-600",
          tab: "max-w-fit px-0 h-12",
          tabContent:
            "text-main-h dark:text-main-dark-h group-data-[selected=true]:text-bittersweet-400 dark:group-data-[selected=true]:text-cerise-red-600",
          panel: "w-full px-6 pt-10 pb-14 md:pb-6 bg-white dark:bg-full-dark",
        }}
      >
        <Tab
          key="/adicionales/guias"
          as={Link}
          href="/adicionales/guias"
          title={
            <div className="flex items-center space-x-2">
              <GuidesIcon className="size-5 text-main-m group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-m dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Guías</span>
            </div>
          }
        >
          <Guides />
        </Tab>
        <Tab
          key="/adicionales/enlaces"
          as={Link}
          href="/adicionales/enlaces"
          title={
            <div className="flex items-center space-x-2">
              <LinksIcon className="size-5 text-main-m group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-m dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Enlaces</span>
            </div>
          }
        >
          <Links />
        </Tab>
        <Tab
          key="/adicionales/recomendaciones"
          as={Link}
          href="/adicionales/recomendaciones"
          title={
            <div className="flex items-center space-x-2">
              <RecommendationsIcon className="size-5 text-main-m group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-m dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Recomendaciones</span>
            </div>
          }
        >
          <Recommendations />
        </Tab>
        <Tab
          key="/adicionales/emergencias"
          as={Link}
          href="/adicionales/emergencias"
          title={
            <div className="flex items-center space-x-2">
              <EmergenciesIcon className="size-5 text-main-m group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-m dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Emergencias</span>
            </div>
          }
        >
          <Emergencies />
        </Tab>
      </Tabs>
    </div>
  );
}
