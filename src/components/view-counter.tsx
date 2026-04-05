"use client";

import { useEffect, useState } from "react";

import { CountUp } from "@/components/count-up";
import { incrementViews } from "@/lib/server/views";

const ViewCounter = ({ slug }: { slug: string }) => {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    incrementViews({ data: { slug } })
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

  if (views === null) {
    return <span className="motion-safe:animate-pulse">0</span>;
  }

  return (
    <span title={`${Intl.NumberFormat("en-US").format(views)} ${views === 1 ? "view" : "views"}`}>
      <CountUp start={0} end={views} delay={0} duration={1.5} />
    </span>
  );
};

export { ViewCounter };
