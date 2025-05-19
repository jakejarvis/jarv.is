import { headers } from "next/headers";
import Form from "./comment-form";
import Thread from "./comment-thread";
import SignIn from "./sign-in";
import { auth } from "@/lib/auth";
import { getComments, type CommentWithUser } from "@/lib/server/comments";

const Comments = async ({ slug }: { slug: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const comments = await getComments(slug);

  const commentsByParentId = comments.reduce(
    (acc, comment) => {
      const parentId = comment.parentId || "root";
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(comment);
      return acc;
    },
    {} as Record<string, CommentWithUser[]>
  );

  const rootComments = commentsByParentId["root"] || [];

  return (
    <>
      {session ? (
        <Form slug={slug} />
      ) : (
        <div className="bg-muted/40 flex flex-col items-center justify-center gap-y-4 rounded-lg p-6">
          <p className="text-center font-medium">Join the discussion by signing in:</p>
          <SignIn callbackPath={`/${slug}#comments`} />
        </div>
      )}

      {rootComments.length > 0 ? (
        <div className="space-y-6">
          {rootComments.map((comment: CommentWithUser) => (
            <Thread
              key={comment.id}
              comment={comment}
              replies={commentsByParentId[comment.id] || []}
              allComments={commentsByParentId}
            />
          ))}
        </div>
      ) : (
        <div className="text-foreground/80 py-8 text-center text-lg font-medium tracking-tight">
          Be the first to comment!
        </div>
      )}
    </>
  );
};

export default Comments;
