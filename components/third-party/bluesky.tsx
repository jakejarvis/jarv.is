import { unstable_cache as cache } from "next/cache";
import { EmbeddedPost, PostNotFound } from "bsky-react-post";
import { fetchPost as _fetchPost } from "bsky-react-post/api";
import { cn } from "@/lib/utils";

// https://bsky-react-post.rhinobase.io/next
const fetchPost = cache(_fetchPost, undefined, {
  revalidate: false, // cache indefinitely
  tags: ["bluesky"],
});

const Bluesky = async ({
  id,
  handle,
  className,
}: {
  // https://github.com/rhinobase/react-bluesky/blob/97658fe636b92aaed78530505811d6de350f201e/packages/core/src/types/post.ts#L35
  id: string;
  handle: string;
  className?: string;
}) => {
  try {
    const thread = await fetchPost({ id, handle });

    return (
      <div className={cn("min-h-[120px]", className)}>
        {thread ? <EmbeddedPost thread={thread} /> : <PostNotFound />}
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className={cn("min-h-[120px]", className)}>
        <PostNotFound />
      </div>
    );
  }
};

export default Bluesky;
