"use client";

import { useEffect, useState } from "react";

import { getCommentCount } from "@/lib/server/comments";

const CommentCount = ({ slug }: { slug: string }) => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCommentCount({ data: { slug } })
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
    <span
      title={`${Intl.NumberFormat("en-US").format(count)} ${count === 1 ? "comment" : "comments"}`}
    >
      {Intl.NumberFormat("en-US").format(count)}
    </span>
  );
};

export { CommentCount };
