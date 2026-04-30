"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

import { getCommentCount } from "@/lib/server/comments";

const CommentCount = ({ slug }: { slug: string }) => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCommentCount(slug)
      .then((result: number) => {
        setCount(result);
      })
      .catch((err: unknown) => {
        console.error("[comment-count] error:", err);
        setError(true);
      });
  }, [slug]);

  if (error) {
    return <span title="Error getting comments">?</span>;
  }

  if (count === null) {
    return <span className="motion-safe:animate-pulse">0</span>;
  }

  return (
    <NumberFlow
      className={count === null ? "motion-safe:animate-pulse" : undefined}
      locales={process.env.NEXT_PUBLIC_SITE_LOCALE}
      value={count}
    />
  );
};

export { CommentCount };
