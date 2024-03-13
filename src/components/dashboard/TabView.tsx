import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import { FaChevronDown } from "react-icons/fa";
import { colors } from "../../types/colors";
import { formatDate } from "../../utils/helper";

type TTabViewProps = {
  tabs: TTab[];
  filters?: any;
  currentWeekFilters?: any;
  previousWeekFilters?: any;
};

export const TabView = ({
  tabs,
  currentWeekFilters,
  previousWeekFilters,
}: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showTabPanel, setShowTabPanel] = useState<boolean>(true);

  return (
    <div className="mx-auto p-4 bg-slate-50 border rounded-2xl drop-shadow-md">
      <div className="tabs flex items-center gap-2 justify-between">
        {tabs?.map((tab: TTab, index: number) => (
          <TabItem
            key={tab?.id}
            label={tab?.label}
            previousWeekTotal={tab?.previousWeekTotal}
            comparisionWeekTotal={tab?.comparisionWeekTotal}
            isActive={index === activeTab}
            clickHandler={() => setActiveTab(index)}
            showTabPanel={showTabPanel}
          />
        ))}
        <FaChevronDown
          className={`cursor-pointer ${!showTabPanel && "rotate-180	"}`}
          onClick={() => setShowTabPanel(!showTabPanel)}
        />
      </div>
      {showTabPanel && (
        <>
          <div className="mx-auto pl-4">
            {tabs?.map((tab: TTab, index: number) => (
              <TabPanel key={tab?.id} isActive={index === activeTab}>
                {tab?.content}
              </TabPanel>
            ))}
          </div>
          <div className="date-filters flex gap-2 justify-end">
            <div className="date-filter flex items-center gap-2 text-[10px] py-2 px-3 bg-[#f1f1f1] w-fit">
              <div
                className={`blue-pointer-line w-[10px] h-[2px] rounded-xs bg-[#489AD2]`}
              ></div>
              {currentWeekFilters.map((filter: any, index: number) => (
                <React.Fragment key={filter.value}>
                  <span>{formatDate(filter.value)}</span>
                  {index !== currentWeekFilters.length - 1 && <span> - </span>}
                </React.Fragment>
              ))}{" "}
            </div>
            <div className="date-filter flex items-center gap-2 text-[10px] py-2 px-3 bg-[#f1f1f1] w-fit">
              <div className="dotted-lines flex gap-0.5">
                <div
                  className={`blue-pointer-line w-[2px] h-[2px] rounded-xs bg-[#489AD2]`}
                ></div>
                <div
                  className={`blue-pointer-line w-[4px] h-[2px] rounded-xs bg-[#489AD2]`}
                ></div>
                <div
                  className={`blue-pointer-line w-[2px] h-[2px] rounded-xs bg-[#489AD2]`}
                ></div>
              </div>
              {previousWeekFilters.map((filter: any, index: number) => (
                <React.Fragment key={filter.value}>
                  <span>{formatDate(filter.value)}</span>
                  {index !== currentWeekFilters.length - 1 && <span> - </span>}
                </React.Fragment>
              ))}{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
