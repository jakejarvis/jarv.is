import { formatDate, formatDateISO } from "../../lib/helpers/format-date";

export type TimeProps = {
  date: string | number | Date;
  format?: string;
  className?: string;
};

const Time = ({ date, format = "MMM D", className }: TimeProps) => {
  return (
    <time dateTime={formatDateISO(date)} title={formatDate(date)} className={className}>
      {formatDate(date, format)}
    </time>
  );
};

export default Time;
