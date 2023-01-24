import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type DateRangePicker = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type DateRange = {
  startDate: string;
  endDate: string;
};

export const dateRangePickerToAvailability = (
  dateRangePicker: DateRangePicker
) => {
  const { startDate, endDate } = dateRangePicker;
  const start = dayjs(startDate).format("YYYY-MM-DD");
  const end = dayjs(endDate).format("YYYY-MM-DD");
  return {
    startDate: start,
    endDate: end,
  };
};

export const countDaysInDateRange = (
  availability: DateRangePicker | DateRange
) => {
  const { startDate, endDate } = availability;
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, "day");
};

// check if date range a is overlapping with date range b
export const isDateRangeOverlapping = (
  a: DateRangePicker | DateRange,
  b: DateRangePicker | DateRange
) => {
  const aStart = dayjs(a.startDate);
  const aEnd = dayjs(a.endDate);
  const bStart = dayjs(b.startDate);
  const bEnd = dayjs(b.endDate);
  return (
    aStart.isSameOrBefore(bStart) && aEnd.isSameOrAfter(bEnd) // a overlaps b
  );
};

// check if overlapping a date range list
export const isDateRangeListOverlapping = (
  dateRangeList: (DateRangePicker | DateRange)[],
  dateRange: DateRangePicker | DateRange
) => {
  return dateRangeList.some((item) => isDateRangeOverlapping(item, dateRange));
};

// calculate the total days of a date range list
export const countDaysInDateRangeList = (
  dateRangeList: (DateRangePicker | DateRange)[]
) => {
  return dateRangeList.reduce(
    (acc, item) => acc + countDaysInDateRange(item),
    0
  );
};
