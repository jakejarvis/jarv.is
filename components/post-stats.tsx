"use client";

import { EyeIcon, MessagesSquareIcon } from "lucide-react";
import Link from "next/link";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCommentCounts } from "@/lib/server/comments";
import { getAllViewCounts } from "@/lib/server/views";

const numberFormatter = new Intl.NumberFormat(process.env.NEXT_PUBLIC_SITE_LOCALE);

type Stats = {
  views: Record<string, number>;
  comments: Record<string, number>;
  loaded: boolean;
};

const StatsContext = createContext<Stats>({
  views: {},
  comments: {},
  loaded: false,
});

/**
 * Provider that fetches ALL post stats in a single batch (2 requests total).
 * Wrap this around any component tree that contains PostStats components.
 */
export const PostStatsProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<Stats>({
    views: {},
    comments: {},
    loaded: false,
  });

  useEffect(() => {
    Promise.all([getAllViewCounts(), getAllCommentCounts()])
      .then(([views, comments]) => {
        setStats({ views, comments, loaded: true });
      })
      .catch((err) => {
        console.error("[post-stats] error fetching stats:", err);
        setStats({ views: {}, comments: {}, loaded: true });
      });
  }, []);

  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>;
};

/**
 * Displays view/comment badges for a single post.
 * Must be used within a PostStatsProvider.
 */
const PostStats = ({ slug }: { slug: string }) => {
  const { views, comments, loaded } = useContext(StatsContext);

  if (!loaded) {
    return (
      <>
        <Skeleton className="inline-block h-5 w-16 translate-y-[-2px] rounded-4xl border border-transparent align-middle" />
        <Skeleton className="inline-block h-5 w-12 translate-y-[-2px] rounded-4xl border border-transparent align-middle" />
      </>
    );
  }

  const viewCount = views[slug] ?? 0;
  const commentCount = comments[slug] ?? 0;

  return (
    <>
      {viewCount > 0 && (
        <Badge
          variant="secondary"
          className="text-foreground/80 gap-[5px] text-[11px] tabular-nums"
        >
          <EyeIcon className="text-foreground/65" aria-hidden="true" />
          {numberFormatter.format(viewCount)}
        </Badge>
      )}

      {commentCount > 0 && (
        <Badge
          variant="secondary"
          className="text-foreground/80 gap-[5px] text-[11px] tabular-nums"
          render={
            <Link
              href={`/${slug}#comments`}
              title={`${numberFormatter.format(commentCount)} ${commentCount === 1 ? "comment" : "comments"}`}
            />
          }
        >
          <MessagesSquareIcon className="text-foreground/65" aria-hidden="true" />
          {numberFormatter.format(commentCount)}
        </Badge>
      )}
    </>
  );
};

export { PostStats };
