import NumberFlow from "@number-flow/react";
import { connection } from "next/server";

import { getCommentCount } from "@/lib/data/comments";

const CommentCount = async ({ slug }: { slug: string }) => {
  // render per-request (as a dynamic hole) so the post's static shell keeps its long cache lifetime
  await connection();
  const count = await getCommentCount(slug);

  return <NumberFlow locales={import.meta.env.VITE_SITE_LOCALE} value={count} />;
};

export { CommentCount };
