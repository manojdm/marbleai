import dayjs from "dayjs";

export const formatDate = (date: dayjs.Dayjs): string => {
  return date.format("MMM D, YYYY");
};
