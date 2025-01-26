"use client";

import { Tabs, Tab } from "@heroui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { siteConfig } from "@/config/site";

export default function AdditionalsTabs() {
  const pathname = usePathname();
  const tabListRef = useRef<HTMLDivElement>(null);
  const additionalTabs = siteConfig.additionalLinks;

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
            "p-0 mx-6 gap-0 rounded-none border-b border-gray-200 dark:border-dark",
          cursor: "w-full bg-danger",
          tab: "max-w-fit px-4 h-12 data-[disabled=true]:!opacity-50",
          tabContent:
            "text-main-h dark:text-main-dark-h group-data-[selected=true]:text-bittersweet-400 dark:group-data-[selected=true]:text-cerise-red-600",
          panel: "w-full px-6 pt-10 pb-6 bg-white dark:bg-full-dark",
        }}
      >
        {additionalTabs.slice(0, 2).map((tab, index) => (
          <Tab
            key={tab.href}
            as={Link}
            href={tab.href}
            isDisabled={index > 1}
            title={
              <div className="flex items-center space-x-2">
                {pathname === tab.href ? (
                  <>
                    {tab.activeIcon ? (
                      <tab.activeIcon className="size-4 group-data-[selected=true]:text-danger" />
                    ) : null}
                  </>
                ) : (
                  <tab.icon className="size-4 text-main-h dark:text-main-dark-h" />
                )}
                <span>{tab.name}</span>
              </div>
            }
          >
            {<tab.component />}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
