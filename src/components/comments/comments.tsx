"use client";

import { useQuery } from "@tanstack/react-query";

import { useSession } from "@/lib/auth-client";
import type { CommentUser, CommentWithUser } from "@/lib/comments";
import { commentsQueryOptions } from "@/lib/queries";

import { NewCommentForm } from "./comment-form";
import { CommentThread } from "./comment-thread";
import { CommentsSkeleton } from "./comments-skeleton";
import { SignIn } from "./sign-in";

/** Loaded in the browser after hydration (posts are prerendered, so their HTML holds the skeleton). */
const Comments = ({ slug }: { slug: string }) => {
  const session = useSession();
  const comments = useQuery(commentsQueryOptions(slug));

  if (comments.isPending || session.isPending) {
    return <CommentsSkeleton />;
  }

  if (comments.isError) {
    return (
      <div className="py-8 text-center text-lg font-medium text-foreground/80">
        Comments couldn&rsquo;t be loaded. Please try again later.
      </div>
    );
  }

  // only pass the public fields down
  const user = session.data?.user;
  const currentUser: CommentUser | null = user
    ? { id: user.id, name: user.name, image: user.image ?? null }
    : null;

  const commentsByParentId = comments.data.reduce(
    (acc, comment) => {
      const parentId = comment.parentId || "root";
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(comment);
      return acc;
    },
    {} as Record<string, CommentWithUser[]>,
  );

  const rootComments = commentsByParentId.root || [];

  return (
    <>
      {currentUser ? (
        <NewCommentForm slug={slug} currentUser={currentUser} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-muted/40 p-6">
          <p className="text-center font-medium">Join the discussion by signing in:</p>
          <SignIn callbackPath={`/${slug}#comments`} />
        </div>
      )}

      {rootComments.length > 0 ? (
        <div className="space-y-6">
          {rootComments.map((comment: CommentWithUser) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              replies={commentsByParentId[comment.id] || []}
              allComments={commentsByParentId}
              currentUser={currentUser}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-lg font-medium text-foreground/80">
          Be the first to comment!
        </div>
      )}
    </>
  );
};

export { Comments };
