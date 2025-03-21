import { format, formatISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { tz } from "@date-fns/tz";
import { utc } from "@date-fns/utc";
import * as config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

export type TimeProps = ComponentPropsWithoutRef<"time"> & {
  date: string;
  format?: string;
};

const Time = ({ date, format: formatStr = "PPpp", ...rest }: TimeProps) => {
  return (
    <time
      dateTime={formatISO(date, { in: utc })}
      title={format(date, "MMM d, y, h:mm a O", { in: tz(config.timeZone), locale: enUS })}
      {...rest}
    >
      {format(date, formatStr, { in: tz(config.timeZone), locale: enUS })}
    </time>
  );
};

export default Time;
