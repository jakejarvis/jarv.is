"use client";

import { IconEye, IconMessages } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { postStatsQueryOptions } from "@/lib/queries";

const numberFormatter = new Intl.NumberFormat(import.meta.env.VITE_SITE_LOCALE);

/**
 * Placeholder shown while the stats for a post are loading.
 */
const PostStatsSkeleton = () => (
  <>
    <Skeleton className="inline-block h-5 w-16 translate-y-[-2px] rounded-4xl border border-transparent align-middle" />
    <Skeleton className="inline-block h-5 w-12 translate-y-[-2px] rounded-4xl border border-transparent align-middle" />
  </>
);

/**
 * Displays view/comment badges for a single post (`slug` is e.g. "notes/dark-mode"). Every instance shares one
 * post-stats query, fetched in the browser.
 */
const PostStats = ({ slug }: { slug: string }) => {
  const { data } = useQuery(postStatsQueryOptions());
  if (!data) return <PostStatsSkeleton />;

  const { views, comments } = data;

  const viewCount = views[slug] ?? 0;
  const commentCount = comments[slug] ?? 0;

  return (
    <>
      {viewCount > 0 && (
        <Badge
          variant="secondary"
          className="gap-[5px] text-xs font-medium tracking-wide text-foreground/80"
        >
          <IconEye className="text-foreground/65" aria-hidden="true" />
          {numberFormatter.format(viewCount)}
        </Badge>
      )}

      {commentCount > 0 && (
        <Badge
          variant="secondary"
          className="gap-[5px] text-xs font-medium tracking-wide text-foreground/80"
          render={
            <Link
              to="/notes/$slug"
              params={{ slug: slug.replace(/^notes\//, "") }}
              hash="comments"
              title={`${numberFormatter.format(commentCount)} ${commentCount === 1 ? "comment" : "comments"}`}
            />
          }
        >
          <IconMessages className="text-foreground/65" aria-hidden="true" />
          {numberFormatter.format(commentCount)}
        </Badge>
      )}
    </>
  );
};

export { PostStats, PostStatsSkeleton };
