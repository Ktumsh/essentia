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

export default function AdditionalsTabs({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const additionalTabs = navConfig.additionalLinks;

  const isGuidePage = pathname.includes("/additionals/guides/");

  if (isGuidePage) {
    return <>{children}</>;
  }

  return (
    <Tabs
      value={pathname}
      aria-label="Options"
      className="flex flex-col space-y-10"
    >
      <TabsList className="border-border h-12 w-full justify-start rounded-none border-b bg-transparent! p-0">
        {additionalTabs.map((tab, index) => (
          <TabsTrigger
            key={tab.path}
            value={tab.path}
            asChild
            disabled={index > 1}
            className="data-[state=active]:border-primary data-[state=active]:text-primary! h-full w-fit rounded-none border-b-2 border-transparent px-4 font-normal data-[state=active]:shadow-none"
          >
            <Link href={tab.path}>
              <div className="flex items-center space-x-2">
                {pathname === tab.path ? (
                  <>
                    {tab.activeIcon ? (
                      <tab.activeIcon className="group-data-[selected=true]:text-primary size-4" />
                    ) : null}
                  </>
                ) : (
                  <tab.icon className="text-muted-foreground size-4" />
                )}
                <span className="leading-normal">{tab.name}</span>
              </div>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {additionalTabs.map((tab, index) => (
        <TabsContent key={index} value={tab.path} className="mb-0!">
          {<tab.component />}
        </TabsContent>
      ))}
    </Tabs>
  );
}
