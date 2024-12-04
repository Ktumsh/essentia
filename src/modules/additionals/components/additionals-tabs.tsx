"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
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

  let activeTab = "guides";

  if (pathname.startsWith("/adicionales/guias")) {
    activeTab = "guides";
  } else if (pathname.startsWith("/adicionales/emergencias")) {
    activeTab = "emergencies";
  } else if (pathname.startsWith("/adicionales/enlaces")) {
    activeTab = "links";
  } else if (pathname.startsWith("/adicionales/recomendaciones")) {
    activeTab = "recommendations";
  }

  useEffect(() => {
    if (tabListRef.current) {
      const activeTabElement = tabListRef.current.querySelector(
        `[data-key="${activeTab}"]`,
      );
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="flex size-full flex-col">
      <Tabs
        ref={tabListRef}
        selectedKey={activeTab}
        aria-label="Options"
        variant="underlined"
        fullWidth
        classNames={{
          base: "z-10 z-0",
          tabList:
            "p-0 mx-6 rounded-none gap-0 border-b border-gray-200 dark:border-dark",
          cursor: "w-full bg-bittersweet-400 dark:bg-cerise-red-600",
          tab: "max-w-fit px-4 h-12 font-semibold",
          tabContent:
            "text-main-h dark:text-main-dark-h group-data-[selected=true]:text-danger",
          panel: "w-full px-6 py-10 bg-white dark:bg-full-dark",
        }}
      >
        <Tab
          key="guides"
          as={Link}
          href="/adicionales/guias"
          title={
            <div className="flex items-center space-x-1.5">
              <GuidesIcon className="size-4 text-main-h group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-h dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Guías</span>
            </div>
          }
        >
          <Guides />
        </Tab>
        <Tab
          key="emergencies"
          as={Link}
          href="/adicionales/emergencias"
          title={
            <div className="flex items-center space-x-1.5">
              <EmergenciesIcon className="size-4 text-main-h group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-h dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Emergencias</span>
            </div>
          }
        >
          <Emergencies />
        </Tab>
        <Tab
          isDisabled
          key="links"
          as={Link}
          href="/adicionales/enlaces"
          className="data-[disabled=true]:opacity-50"
          title={
            <div className="flex items-center space-x-1.5">
              <LinksIcon className="size-4 text-main-h group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-h dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Enlaces</span>
            </div>
          }
        >
          <Links />
        </Tab>
        <Tab
          isDisabled
          key="recommendations"
          as={Link}
          href="/adicionales/recomendaciones"
          className="data-[disabled=true]:opacity-50"
          title={
            <div className="flex items-center space-x-1.5">
              <RecommendationsIcon className="size-4 text-main-h group-data-[selected=true]:text-bittersweet-400 dark:text-main-dark-h dark:group-data-[selected=true]:text-cerise-red-600" />
              <span>Recomendaciones</span>
            </div>
          }
        >
          <Recommendations />
        </Tab>
      </Tabs>
    </div>
  );
}
