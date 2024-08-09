"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";

export default function NewsTabs() {
  const [selected, setSelected] = useState<any>("todo");

  const handleSelectionChange = (key: any) => {
    setSelected(key);
  };
  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
      classNames={{
        tabList: "relative w-full bg-transparent",
        tab: "max-w-fit",
        cursor: "bg-white dark:bg-cerise-red-600/50 shadow-small rounded-lg",
        tabContent:
          "text-base-color-h dark:text-base-color-dark-h group-data-[selected=true]:text-base-color dark:group-data-[selected=true]:text-base-color-dark",
        panel: "px-0 py-5",
      }}
    >
      <Tab key="todo" title="Todo"></Tab>
      <Tab key="internacional" title="Internacional"></Tab>
      <Tab key="nacional" title="Nacional"></Tab>
    </Tabs>
  );
}
