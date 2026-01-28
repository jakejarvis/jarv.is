"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EyeIcon, MessagesSquareIcon } from "lucide-react";
import { env } from "@/lib/env";
import { getViewCount } from "@/lib/server/views";
import { getCommentCount } from "@/lib/server/comments";

const numberFormatter = new Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE);

const PostStats = ({ slug }: { slug: string }) => {
  const [stats, setStats] = useState<{ views: number; comments: number } | null>(null);

  useEffect(() => {
    Promise.all([getViewCount(slug), getCommentCount(slug)])
      .then(([views, comments]) => {
        setStats({ views, comments });
      })
      .catch((err) => {
        console.error("[post-stats] error:", err);
        // Silently fail - just don't show stats
      });
  }, [slug]);

  if (!stats) {
    return null; // No loading state - badges just appear when ready
  }

  return (
    <>
      {stats.views > 0 && (
        <span className="bg-muted text-foreground/65 inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
          <EyeIcon className="inline-block size-4 shrink-0" aria-hidden="true" />
          <span className="inline-block leading-none tabular-nums">{numberFormatter.format(stats.views)}</span>
        </span>
      )}

      {stats.comments > 0 && (
        <Link
          href={`/${slug}#comments`}
          title={`${numberFormatter.format(stats.comments)} ${stats.comments === 1 ? "comment" : "comments"}`}
          className="inline-flex hover:no-underline"
        >
          <span className="bg-muted text-foreground/65 inline-flex h-5 flex-nowrap items-center gap-1 rounded-md px-1.5 align-text-top text-xs font-semibold text-nowrap shadow select-none">
            <MessagesSquareIcon className="inline-block size-3 shrink-0" aria-hidden="true" />
            <span className="inline-block leading-none tabular-nums">{numberFormatter.format(stats.comments)}</span>
          </span>
        </Link>
      )}
    </>
  );
};

export default PostStats;
