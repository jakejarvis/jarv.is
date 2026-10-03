import { IconEye, IconMessages } from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getPostStats } from "@/lib/data/stats";

const numberFormatter = new Intl.NumberFormat(process.env.NEXT_PUBLIC_SITE_LOCALE);

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
 * Displays view/comment badges for a single post.
 * Every instance shares one cached getPostStats() result.
 */
const PostStats = async ({ slug }: { slug: string }) => {
  const { views, comments } = await getPostStats();

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
              href={`/${slug}#comments`}
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
