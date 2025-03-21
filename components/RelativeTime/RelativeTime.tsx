"use client";

import { useHasMounted } from "../../hooks";
import { format, formatISO, formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import { tz } from "@date-fns/tz";
import { utc } from "@date-fns/utc";
import * as config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

export type RelativeTimeProps = ComponentPropsWithoutRef<"time"> & {
  date: string;
};

const RelativeTime = ({ date, ...rest }: RelativeTimeProps) => {
  // play nice with SSR -- only use relative time on the client, since it'll quickly become outdated on the server and
  // cause a react hydration mismatch error.
  const hasMounted = useHasMounted();

  return (
    <time
      dateTime={formatISO(date, { in: utc })}
      title={format(date, "MMM d, y, h:mm a O", { in: tz(config.timeZone), locale: enUS })}
      {...rest}
    >
      {hasMounted
        ? formatDistanceToNowStrict(date, { locale: enUS, addSuffix: true })
        : `on ${format(date, "MMM d, y", { in: tz(config.timeZone), locale: enUS })}`}
    </time>
  );
};

export default RelativeTime;
