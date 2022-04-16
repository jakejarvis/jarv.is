import { formatDateTZ, formatDateISO, FlexibleDate } from "../../lib/helpers/format-date";

export type TimeProps = {
  date: FlexibleDate;
  format?: string;
  className?: string;
};

const Time = ({ date, format = "MMM d", className }: TimeProps) => (
  <time dateTime={formatDateISO(date)} title={formatDateTZ(date)} className={className}>
    {formatDateTZ(date, format)}
  </time>
);

export default Time;
