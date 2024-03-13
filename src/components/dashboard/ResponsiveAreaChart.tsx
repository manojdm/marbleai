import React, { useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ComposedChart,
  TooltipProps,
} from "recharts";
import { IChartDatum } from "../../interfaces";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { colors as customColors } from "../../types/colors";

type TResponsiveAreaChartProps = {
  kpi: string;
  previousWeekData: IChartDatum[];
  comparisionWeekData?: IChartDatum[];
  colors: {
    stroke: string;
  };
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload) return null;

  // Iterate through payload to format date and value
  const formattedContent = payload.map((item: any) => (
    <div key={item.payload?.date}>
      {item.payload.date}: {item.value}
    </div>
  ));

  return <div>{formattedContent}</div>; // Render formatted content
};

export const ResponsiveAreaChart = ({
  kpi,
  previousWeekData,
  comparisionWeekData,
  colors,
}: TResponsiveAreaChartProps) => {
  const newData = previousWeekData?.map((obj) => ({
    ...obj,
    day: dayjs(obj.date, "MMM DD, YYYY").format("ddd"),
  }));

  const newData2 = comparisionWeekData?.map((obj) => ({
    ...obj,
    day: dayjs(obj.date, "MMM DD, YYYY").format("ddd"),
  }));

  return (
    <>
      {!newData && (
        <Skeleton
          height={400}
          borderRadius={16}
          baseColor={customColors.SKELETON_GRAY}
        />
      )}
      {newData && (
        <ResponsiveContainer height={400}>
          <ComposedChart
            height={400}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            data={previousWeekData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tick={{
                stroke: "light-grey",
                strokeWidth: 0.5,
                fontSize: "18px",
              }}
              axisLine={false}
              allowDuplicatedCategory={false}
            />
            <YAxis
              tickCount={4}
              tick={{
                stroke: "light-grey",
                strokeWidth: 0,
                fontSize: "18px",
              }}
              interval="preserveStartEnd"
              domain={[0, "dataMax + 10"]}
              axisLine={false}
              dx={-16}
            />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: "0 solid #000",
                borderRadius: "10px",
                color: "#fff",
                padding: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              strokeWidth={3}
              fillOpacity={0}
              data={newData}
              color={customColors.COOL_BLUE}
            />
            {comparisionWeekData && (
              <Area
                type="monotone"
                dataKey="value"
                data={newData2}
                stroke={colors?.stroke}
                strokeWidth={3}
                fillOpacity={0}
                strokeDasharray="10 10"
                opacity={0.3}
                color={customColors.COOL_BLUE}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
