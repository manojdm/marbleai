import React from "react";

type TTabItem = {
  label: string;
  isActive: boolean;
  clickHandler: () => void;
  previousWeekTotal?: number;
  comparisionWeekTotal?: number;
};
export const TabItem = ({
  label,
  isActive,
  clickHandler,
  previousWeekTotal,
  comparisionWeekTotal,
}: TTabItem) => {
  return (
    <div
      className={`text-l p-3 rounded-lg font-sm mb-3 ${
        isActive ? " tab-active" : ""
      }`}
      onClick={clickHandler}
    >
      <div className="label">{label}</div>
      <div className="amount">{previousWeekTotal}</div>
      <div className="diff">{comparisionWeekTotal}</div>
    </div>
  );
};
