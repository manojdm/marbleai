import React from "react";

type TTabItem = {
  label: string;
  isActive: boolean;
  clickHandler: () => void;
  total?: number;
};
export const TabItem = ({ label, isActive, clickHandler, total }: TTabItem) => {
  return (
    <div
      className={`text-l p-3 rounded-lg font-sm mb-3 ${
        isActive ? " tab-active" : ""
      }`}
      onClick={clickHandler}
    >
      <div className="label">{label}</div>
      <div className="amount">{total}</div>
    </div>
  );
};
