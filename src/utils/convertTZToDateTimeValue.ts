import dayjs from "dayjs";

export const convertTZToDateTimeValue = (date: string) => {
  if (!date) return null;
  const format = "DD-MM-YYYY HH:mm";
  return dayjs(date).format(format);
};
