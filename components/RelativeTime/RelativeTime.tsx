"use client";

import TimeAgo from "react-timeago";
import Time from "../Time";
import { useHasMounted } from "../../hooks";
import type { ComponentPropsWithoutRef } from "react";

export type RelativeTimeProps = ComponentPropsWithoutRef<"time"> & {
  date: string;
};

const RelativeTime = ({ date, ...rest }: RelativeTimeProps) => {
  // play nice with SSR -- only use relative time on the client, since it'll quickly become outdated on the server and
  // cause a react hydration mismatch error.
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <Time date={date} format="MMM d, y" {...rest} />;
  }

  return <TimeAgo date={date} {...rest} />;
};

export default RelativeTime;
