import React, { useMemo } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { TabView } from "../../components/dashboard/TabView";
import { IChartDatum, TTab } from "../../interfaces";

const previousWeekDataFilters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs().subtract(1, "week").startOf("week"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().subtract(1, "week").endOf("week"),
  },
];

const comparisionWeekDataFilters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(2, "week")?.startOf("week"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().subtract(2, "week").endOf("week"),
  },
];

export const Dashboard: React.FC = () => {
  const { data: previousWeekDailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters: previousWeekDataFilters,
  });

  const { data: previousWeekDailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters: previousWeekDataFilters,
  });

  const { data: previousWeekNewCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters: previousWeekDataFilters,
  });

  const { data: comparisionWeekDailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    pagination: {
      pageSize: 2,
    },
    filters: comparisionWeekDataFilters,
  });

  const { data: comparisionWeekDailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters: comparisionWeekDataFilters,
  });

  const { data: comparisionWeekNewCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters: comparisionWeekDataFilters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  //previous Week data
  const previousWeekRevenueData = useMemoizedChartData(
    previousWeekDailyRevenue
  );
  const previousWeekOrdersData = useMemoizedChartData(previousWeekDailyOrders);
  const previousWeekNewCustomersData = useMemoizedChartData(
    previousWeekNewCustomers
  );

  //comparision Week data
  const comparisionWeekRevenueData = useMemoizedChartData(
    comparisionWeekDailyRevenue
  );
  const comparisionWeekOrdersData = useMemoizedChartData(
    comparisionWeekDailyOrders
  );
  const comparisionWeekNewCustomersData = useMemoizedChartData(
    comparisionWeekNewCustomers
  );

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveAreaChart
          kpi="Daily revenue"
          data={previousWeekRevenueData}
          data2={comparisionWeekRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
          }}
        />
      ),
      previousWeekTotal: previousWeekDailyRevenue?.data?.total,
      comparisionWeekTotal: comparisionWeekDailyRevenue?.data?.total,
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveAreaChart
          kpi="Daily orders"
          data={previousWeekOrdersData}
          data2={comparisionWeekOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
          }}
        />
      ),
      previousWeekTotal: previousWeekDailyOrders?.data?.total,
      comparisionWeekTotal: comparisionWeekDailyOrders?.data?.total,
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveAreaChart
          kpi="New customers"
          data={previousWeekNewCustomersData}
          data2={comparisionWeekNewCustomersData}
          colors={{
            stroke: "rgb(76, 175, 80)",
          }}
        />
      ),
      previousWeekTotal: previousWeekNewCustomers?.data?.total,
      comparisionWeekTotal: comparisionWeekNewCustomers?.data?.total,
    },
  ];

  return (
    <>
      <TabView filters={previousWeekDataFilters} tabs={tabs} />
    </>
  );
};
