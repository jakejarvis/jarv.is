import { formatDate } from "../../lib/helpers/format-date";

export type TimeProps = {
  date: string | number | Date;
  format?: string;
  className?: string;
};

const Time = ({ date, format = "MMM D", className }: TimeProps) => {
  return (
    <time dateTime={formatDate(date)} title={formatDate(date, "MMM D, YYYY, h:mm A z")} className={className}>
      {formatDate(date, format)}
    </time>
  );
};

export default Time;
