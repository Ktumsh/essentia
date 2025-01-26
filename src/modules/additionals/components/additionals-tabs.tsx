"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";

export default function AdditionalsTabs() {
  const pathname = usePathname();
  const additionalTabs = siteConfig.additionalLinks;

  return (
    <Tabs
      value={pathname}
      aria-label="Options"
      className="flex flex-col space-y-10 px-6 pb-6"
    >
      <TabsList className="h-12 w-full justify-start rounded-none border-b border-gray-200 !bg-transparent p-0 dark:border-dark">
        {additionalTabs.slice(0, 2).map((tab, index) => (
          <TabsTrigger
            key={tab.href}
            value={tab.href}
            asChild
            disabled={index > 1}
            className="h-full w-fit rounded-none border-b-2 border-transparent px-4 font-normal data-[state=active]:border-danger data-[state=active]:!text-danger data-[state=active]:shadow-none"
          >
            <Link href={tab.href}>
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
