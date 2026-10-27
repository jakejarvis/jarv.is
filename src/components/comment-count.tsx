"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";

import { commentsQueryOptions } from "@/lib/queries";

/** Shares the comments section's query, so it costs no extra request. */
const CommentCount = ({ slug }: { slug: string }) => {
  const { data: count } = useQuery({
    ...commentsQueryOptions(slug),
    select: (comments) => comments.length,
  });

  return (
    <NumberFlow
      className={count === undefined ? "motion-safe:animate-pulse" : undefined}
      locales={import.meta.env.VITE_SITE_LOCALE}
      value={count ?? 0}
    />
  );
};

export { CommentCount };
