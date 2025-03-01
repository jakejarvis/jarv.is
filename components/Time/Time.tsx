import { formatDate } from "../../lib/helpers/format-date";
import type { ComponentPropsWithoutRef } from "react";

export type TimeProps = ComponentPropsWithoutRef<"time"> & {
  date: string | number | Date;
  format?: string;
};

const Time = ({ date, format = "MMM D", ...rest }: TimeProps) => {
  return (
    <time dateTime={formatDate(date)} title={formatDate(date, "MMM D, YYYY, h:mm A z")} {...rest}>
      {formatDate(date, format)}
    </time>
  );
};

export default Time;
