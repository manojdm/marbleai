import React from "react";
import Skeleton from "react-loading-skeleton";
import { colors } from "../../types/colors";
import { IoMdArrowDropup } from "react-icons/io";

type TTabItem = {
  label: string;
  isActive: boolean;
  clickHandler: () => void;
  previousWeekTotal: number;
  comparisionWeekTotal: number;
  showTabPanel: boolean;
};
export const TabItem = ({
  label,
  isActive,
  clickHandler,
  previousWeekTotal,
  comparisionWeekTotal,
  showTabPanel,
}: TTabItem) => {
  return (
    <div
      className={`text-l cursor-pointer rounded-2xl py-3 px-3 flex-1 rounded-lg font-sm ${
        showTabPanel && "mb-3"
      } ${!previousWeekTotal && "bg-[#e3e3e3]"} ${
        isActive ? " bg-[#f1f1f1]" : ""
      }`}
      onClick={clickHandler}
    >
      <div className="text-xs w-fit mb-2 font-semibold">
        {!previousWeekTotal ? (
          <Skeleton
            baseColor={colors.SKELETON_GRAY}
            height={32}
            width="200px"
          />
        ) : (
          <div className="span border-b border-black border-dashed ">
            {label}
          </div>
        )}
      </div>
      <div className="values flex items-center justify-start w-full">
        {!previousWeekTotal && (
          <Skeleton
            baseColor={colors.SKELETON_GRAY}
            height={22}
            width="250px"
          />
        )}
        <div className="previousWeekTotalResults text-[15px] font-semibold">
          {previousWeekTotal}
        </div>
        {comparisionWeekTotal && <IoMdArrowDropup />}
        <div className="diff text-[10px]">
          {comparisionWeekTotal &&
            -(100 - 100 * (comparisionWeekTotal / previousWeekTotal)).toFixed(
              2
            ) + "%"}
        </div>
      </div>
    </div>
  );
};
