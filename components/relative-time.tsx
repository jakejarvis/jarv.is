"use client";

import TimeAgo from "react-timeago";

const RelativeTime = ({ ...rest }: React.ComponentProps<typeof TimeAgo>) => {
  return (
    <span suppressHydrationWarning>
      <TimeAgo {...rest} />
    </span>
  );
};

export default RelativeTime;
