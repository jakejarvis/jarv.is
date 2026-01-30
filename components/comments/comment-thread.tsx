import { CommentSingle } from "./comment-single";
import { cn } from "@/lib/utils";
import type { CommentWithUser } from "@/lib/server/comments";

/** Maximum nesting depth for comment threads (0-indexed, so 2 = 3 levels deep) */
const MAX_NESTING_LEVEL = 2;

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
  return (
    <>
      <CommentSingle comment={comment} />

      {replies.length > 0 && (
        <div className={cn("mt-6 space-y-6", level < MAX_NESTING_LEVEL && "ml-6 border-l-2 pl-6")}>
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
