"use client";

import TimeAgo from "react-timeago";
import { type ComponentPropsWithoutRef } from "react";

const RelativeTime = ({ ...rest }: ComponentPropsWithoutRef<typeof TimeAgo>) => {
  return (
    <span suppressHydrationWarning>
      <TimeAgo {...rest} />
    </span>
  );
};

export default RelativeTime;
