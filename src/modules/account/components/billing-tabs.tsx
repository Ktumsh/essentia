"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { UserProfileData } from "@/types/session";

import AccountDetails from "./account-details";
import BillingDetails from "./billing-details";

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

  const activeTab = pathname.includes("/account/billing")
    ? "billing"
    : "account";

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
    <div className="flex flex-col">
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
        <Tab key="account" as={Link} href="/account" title="Mi cuenta">
          <AccountDetails profileData={profileData} />
        </Tab>
        <Tab
          key="billing"
          as={Link}
          href="/account/billing"
          title="Detalles del plan"
        >
          <BillingDetails
            billingDetails={billingDetails}
            clientSecret={clientSecret}
            profileData={profileData}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default BillingTabs;
