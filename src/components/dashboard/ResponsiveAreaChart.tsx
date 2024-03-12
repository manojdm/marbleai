import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  data2?: IChartDatum[];
  colors: {
    stroke: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  data2,
  colors,
}: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer height={400}>
      <AreaChart
        data={data}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickCount={1}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "18px",
          }}
          stroke="none"
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
        />
        <Tooltip
          content={<ChartTooltip kpi={kpi} colors={colors} />}
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "0 solid #000",
            borderRadius: "10px",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={colors?.stroke}
          strokeWidth={3}
          fillOpacity={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
