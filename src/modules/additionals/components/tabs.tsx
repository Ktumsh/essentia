"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Centers from "./centers";
import Guides from "./guides";
import Links from "./links";
import Recommendations from "./recommendations";
import Emergencies from "./emergencies";
import {
  EmergenciesIcon,
  GuidesIcon,
  HealthCentersIcon,
  LinksIcon,
  RecommendationsIcon,
} from "@/modules/icons/miscellaneus";

export default function AdditionalsTabs() {
  const pathname = usePathname();
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabListRef.current) {
      const activeTab = tabListRef.current.querySelector(
        `[data-key="${pathname}"]`
      );
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [pathname]);

  return (
    <div className="flex size-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={pathname}
        variant="underlined"
        fullWidth
        classNames={{
          base: "absolute top-14 left-0 md:static z-10 md:z-0",
          tabList:
            "p-0 mx-4 md:mx-0 gap-6 rounded-none border-b border-gray-50 dark:border-white/10",
          cursor: "w-full bg-bittersweet-400 dark:bg-cerise-red-600",
          tab: "max-w-fit px-0 h-12",
          tabContent:
            "text-base-color-h dark:text-base-color-dark-h group-data-[selected=true]:text-bittersweet-400 dark:group-data-[selected=true]:text-cerise-red-600",
          panel: "px-0 py-0 md:py-5 h-full",
        }}
        ref={tabListRef}
      >
        <Tab
          key="/adicionales/guias"
          title={
            <div className="flex items-center space-x-2">
              <GuidesIcon className="size-5" />
              <span>Guías</span>
            </div>
          }
          as={Link}
          href="/adicionales/guias"
        >
          <Guides />
        </Tab>
        <Tab
          key="/adicionales/enlaces"
          title={
            <div className="flex items-center space-x-2">
              <LinksIcon className="size-5" />
              <span>Enlaces</span>
            </div>
          }
          as={Link}
          href="/adicionales/enlaces"
        >
          <Links />
        </Tab>
        <Tab
          key="/adicionales/recomendaciones"
          title={
            <div className="flex items-center space-x-2">
              <RecommendationsIcon className="size-5" />
              <span>Recomendaciones</span>
            </div>
          }
          as={Link}
          href="/adicionales/recomendaciones"
        >
          <Recommendations />
        </Tab>
        <Tab
          key="/adicionales/centros-de-salud"
          title={
            <div className="flex items-center space-x-2">
              <HealthCentersIcon className="size-5" />
              <span>Centros de salud</span>
            </div>
          }
          as={Link}
          href="/adicionales/centros-de-salud"
        >
          <Centers />
        </Tab>
        <Tab
          key="/adicionales/emergencias"
          title={
            <div className="flex items-center space-x-2">
              <EmergenciesIcon className="size-5" />
              <span>Emergencias</span>
            </div>
          }
          as={Link}
          href="/adicionales/emergencias"
        >
          <Emergencies />
        </Tab>
      </Tabs>
    </div>
  );
}
