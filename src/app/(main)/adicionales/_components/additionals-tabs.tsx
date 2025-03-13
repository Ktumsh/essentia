"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { navConfig } from "@/config/nav.config";

export default function AdditionalsTabs() {
  const pathname = usePathname();
  const additionalTabs = navConfig.additionalLinks;

  return (
    <Tabs
      value={pathname}
      aria-label="Options"
      className="flex flex-col space-y-10"
    >
      <TabsList className="border-border h-12 w-full justify-start rounded-none border-b bg-transparent! p-0">
        {additionalTabs.slice(0, 2).map((tab, index) => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            asChild
            disabled={index > 1}
            className="data-[state=active]:border-primary data-[state=active]:text-primary! h-full w-fit rounded-none border-b-2 border-transparent px-4 font-normal data-[state=active]:shadow-none"
          >
            <Link href={tab.href}>
              <div className="flex items-center space-x-2">
                {pathname === tab.href ? (
                  <>
                    {tab.activeIcon ? (
                      <tab.activeIcon className="group-data-[selected=true]:text-primary size-4" />
                    ) : null}
                  </>
                ) : (
                  <tab.icon className="text-main-h dark:text-main-dark-h size-4" />
                )}
                <span>{tab.name}</span>
              </div>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {additionalTabs.slice(0, 2).map((tab, index) => (
        <TabsContent key={index} value={tab.href}>
          {<tab.component />}
        </TabsContent>
      ))}
    </Tabs>
  );
}
