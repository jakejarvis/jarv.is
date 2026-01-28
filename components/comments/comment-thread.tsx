import { CommentSingle } from "./comment-single";
import { cn } from "@/lib/utils";
import type { CommentWithUser } from "@/lib/server/comments";

const CommentThread = ({
  comment,
  replies,
  allComments,
  level = 0,
}: {
  comment: CommentWithUser;
  replies: CommentWithUser[];
  allComments: Record<string, CommentWithUser[]>;
  level?: number;
}) => {
  // Limit nesting to 3 levels
  const maxLevel = 2;

  return (
    <>
      <CommentSingle comment={comment} />

      {replies.length > 0 && (
        <div className={cn("mt-6 space-y-6", level < maxLevel && "ml-6 border-l-2 pl-6")}>
          {replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              replies={allComments[reply.id] || []}
              allComments={allComments}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export { CommentThread };
