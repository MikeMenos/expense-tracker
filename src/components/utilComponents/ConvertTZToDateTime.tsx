import dayjs from "dayjs";

export const ConvertTZToDateTime = ({ date }: { date: string }) => {
  if (!date) return null;
  const format = "DD-MM-YYYY";
  return <div>{dayjs(date).format(format)}</div>;
};
