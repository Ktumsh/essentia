"use client";

import { Tabs, Tab } from "@nextui-org/react";
import BillingDetails from "./billing-details";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import AccountDetails from "./account-details";
import { UserProfileData } from "@/types/session";

interface BillingTabsProps {
  profileData: UserProfileData | null;
  billingDetails: any;
  clientSecret: string;
}

const BillingTabs = ({
  profileData,
  billingDetails,
  clientSecret,
}: BillingTabsProps) => {
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
        ref={tabListRef}
        selectedKey={pathname}
        aria-label="Options"
        variant="underlined"
        fullWidth
        classNames={{
          base: "z-10 z-0",
          tabList:
            "p-0 mx-6 gap-6 rounded-none border-b border-gray-200 dark:border-base-dark",
          cursor: "w-full bg-bittersweet-400 dark:bg-cerise-red-600",
          tab: "max-w-fit px-0 h-12",
          tabContent:
            "text-base-color-h dark:text-base-color-dark-h group-data-[selected=true]:text-bittersweet-400 dark:group-data-[selected=true]:text-cerise-red-600",
          panel: "w-full px-6 py-10 bg-white dark:bg-base-full-dark",
        }}
      >
        <Tab
          key="/account"
          as={Link}
          href="/account"
          title={
            <div className="flex items-center space-x-2">
              <span>Mi cuenta</span>
            </div>
          }
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <AccountDetails profileData={profileData} />
          </div>
        </Tab>
        <Tab
          key="/account/billing"
          as={Link}
          href="/account/billing"
          title={
            <div className="flex items-center space-x-2">
              <span>Detalles del plan</span>
            </div>
          }
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <BillingDetails
              billingDetails={billingDetails}
              clientSecret={clientSecret}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default BillingTabs;
