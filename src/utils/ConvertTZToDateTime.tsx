import dayjs from "dayjs";

export const ConvertTZToDateTime = ({ date }: { date: string }) => {
  if (!date) return "";
  const format = "MM-DD-YYYY HH:mm";
  return <div>{dayjs(date).format(format)}</div>;
};
