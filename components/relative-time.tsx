"use client";

import TimeAgo from "react-timeago";
import { makeIntlFormatter } from "react-timeago/defaultFormatter";

const intlFormatter = makeIntlFormatter({
  locale: "en",
  style: "long",
  numeric: "auto",
});

const RelativeTime = ({ ...rest }: React.ComponentProps<typeof TimeAgo>) => {
  return (
    <span suppressHydrationWarning>
      <TimeAgo formatter={intlFormatter} {...rest} />
    </span>
  );
};

export default RelativeTime;
