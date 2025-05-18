import { headers } from "next/headers";
import Wrapper from "./comments-wrapper";
import Form from "./comment-form";
import Thread from "./comment-thread";
import SignIn from "./sign-in";
import { auth } from "@/lib/auth";
import { getComments, type CommentWithUser } from "@/lib/server/comments";

const Comments = async ({ slug, closed = false }: { slug: string; closed?: boolean }) => {
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
    <Wrapper>
      {closed ? (
        <div className="bg-muted/40 flex min-h-32 items-center justify-center rounded-lg p-6">
          <p className="text-center font-medium">Comments are closed for this post.</p>
        </div>
      ) : !session ? (
        <div className="bg-muted/40 flex flex-col items-center justify-center gap-y-4 rounded-lg p-6">
          <p className="text-center font-medium">Join the discussion by signing in:</p>
          <SignIn callbackPath={`/${slug}#comments`} />
        </div>
      ) : (
        <Form slug={slug} />
      )}

      {!closed && rootComments.length === 0 ? (
        <div className="text-foreground/80 py-8 text-center text-lg font-medium tracking-tight">
          Be the first to comment!
        </div>
      ) : (
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
      )}
    </Wrapper>
  );
};

export default Comments;
