import { env } from "@/lib/env";
import { getCommentCounts } from "@/lib/server/comments";

const CommentCount = async ({ slug }: { slug: string }) => {
  const count = await getCommentCounts(slug);

  return (
    <span
      title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(count)} ${count === 1 ? "comment" : "comments"}`}
    >
      {Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(count)}
    </span>
  );
};

export default CommentCount;
