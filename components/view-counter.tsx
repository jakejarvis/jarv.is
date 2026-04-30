"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

import { incrementViews } from "@/lib/server/views";

const ViewCounter = ({ slug }: { slug: string }) => {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Increment views on client mount (outside of render phase)
    incrementViews(slug)
      .then((hits) => {
        setViews(hits);
      })
      .catch((err) => {
        console.error("[view-counter] error:", err);
        setError(true);
      });
  }, [slug]);

  if (error) {
    return <span title="Error getting views! :(">?</span>;
  }

  return (
    <NumberFlow
      className={views === null ? "motion-safe:animate-pulse" : undefined}
      locales={process.env.NEXT_PUBLIC_SITE_LOCALE}
      value={views ?? 0}
    />
  );
};

export { ViewCounter };
