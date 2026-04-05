"use client";

import { Tweet as ReactTweet } from "react-tweet";
import { cn } from "@/lib/utils";

const Tweet = ({
  id,
  className,
}: { id: string; className?: string }) => (
  <div
    className={cn(
      "my-6 min-h-30",
      "*:[--tweet-body-font-size:var(--text-base)]! *:[--tweet-body-line-height:var(--leading-normal)]! *:[--tweet-container-margin:0_auto]! *:[--tweet-font-family:var(--font-sans)]! *:[--tweet-info-font-size:var(--text-sm)]! *:[--tweet-info-line-height:var(--leading-normal)]!",
      className,
    )}
  >
    <ReactTweet id={id} />
  </div>
);

export { Tweet };
