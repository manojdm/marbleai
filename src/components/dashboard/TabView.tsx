import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";

type TTabViewProps = {
  tabs: TTab[];
  filters: any;
};

export const TabView = ({ tabs, filters }: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto p-4 bg-slate-50 border rounded-lg drop-shadow-md">
      <div className="tabs">
        {tabs?.map((tab: TTab, index: number) => (
          <TabItem
            key={tab?.id}
            label={tab?.label}
            previousWeekTotal={tab?.previousWeekTotal}
            comparisionWeekTotal={tab?.comparisionWeekTotal}
            isActive={index === activeTab}
            clickHandler={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="mx-auto pl-4">
        {tabs?.map((tab: TTab, index: number) => (
          <TabPanel key={tab?.id} isActive={index === activeTab}>
            {tab?.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};
