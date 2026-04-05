"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  type CommentWithUser,
  getComments,
} from "@/lib/server/comments";
import { CommentsSkeleton } from "./comments-skeleton";
import { NewCommentForm } from "./comment-form";
import { CommentThread } from "./comment-thread";
import { SignIn } from "./sign-in";

const Comments = ({ slug }: { slug: string }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentWithUser[] | null>(
    null,
  );

  const fetchComments = () => {
    getComments({ data: { pageSlug: slug } })
      .then(setComments)
      .catch((err) => {
        console.error("[comments] error fetching:", err);
        setComments([]);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  if (comments === null) {
    return <CommentsSkeleton />;
  }

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
      {session ? (
        <NewCommentForm slug={slug} onCommentPosted={fetchComments} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-muted/40 p-6">
          <p className="text-center font-medium">
            Join the discussion by signing in:
          </p>
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
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center font-medium text-foreground/80 text-lg tracking-tight">
          Be the first to comment!
        </div>
      )}
    </>
  );
};

export { Comments };
