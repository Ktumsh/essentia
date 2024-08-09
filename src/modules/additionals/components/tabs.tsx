"use client";

import { useState, useEffect } from "react";

import { Tabs, Tab } from "@nextui-org/react";

import Guides from "./guides";
import Centers from "./centers";
import Phones from "./phones";

export default function AdditionalsTabs() {
  const [selected, setSelected] = useState<any>("guias");

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      setSelected(savedTab);
    }
  }, []);

  const handleSelectionChange = (key: any) => {
    setSelected(key);
    localStorage.setItem("selectedTab", key);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        classNames={{
          tabList:
            "relative w-full bg-white/50 dark:bg-base-full-dark-50 border border-gray-100/50 dark:border-base-full-dark-50 backdrop-blur backdrop-saturate-150 shadow-md lg:rounded-xl",
          tab: "max-w-fit",
          cursor: "bg-white dark:bg-cerise-red-600/50 shadow-small rounded-lg",
          tabContent:
            "text-base-color-h dark:text-base-color-dark-h group-data-[selected=true]:text-base-color dark:group-data-[selected=true]:text-base-color-dark",
          panel: "px-0 py-5",
        }}
      >
        <Tab key="guias" title="Guías">
          <Guides />
        </Tab>
        <Tab key="enlaces" title="Enlaces"></Tab>
        <Tab key="recomendaciones" title="Recomendaciones"></Tab>
        <Tab key="centros-salud" title="Centros de salud">
          <Centers />
        </Tab>
        <Tab key="fonos" title="Fonos de emergencia">
          <Phones />
        </Tab>
      </Tabs>
    </div>
  );
}
