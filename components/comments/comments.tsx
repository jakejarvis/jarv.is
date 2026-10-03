import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { type CommentUser, type CommentWithUser, getComments } from "@/lib/data/comments";

import { NewCommentForm } from "./comment-form";
import { CommentThread } from "./comment-thread";
import { SignIn } from "./sign-in";

const Comments = async ({ slug }: { slug: string }) => {
  // independent queries -- run them in parallel
  const [session, comments] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    getComments(slug),
  ]);

  // only pass the public fields down to client components
  const currentUser: CommentUser | null = session
    ? { id: session.user.id, name: session.user.name, image: session.user.image ?? null }
    : null;

  const commentsByParentId = comments.reduce(
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
