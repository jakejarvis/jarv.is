import type { CommentUser, CommentWithUser } from "@/lib/data/comments";
import { cn } from "@/lib/utils";

import { CommentSingle } from "./comment-single";

/** Maximum nesting depth for comment threads (0-indexed, so 2 = 3 levels deep) */
const MAX_NESTING_LEVEL = 2;

const CommentThread = ({
  comment,
  replies,
  allComments,
  currentUser,
  level = 0,
}: {
  comment: CommentWithUser;
  replies: CommentWithUser[];
  allComments: Record<string, CommentWithUser[]>;
  currentUser: CommentUser | null;
  level?: number;
}) => (
  <>
    <CommentSingle comment={comment} currentUser={currentUser} />

    {replies.length > 0 && (
      <div className={cn("mt-6 space-y-6", level < MAX_NESTING_LEVEL && "ml-6 border-l-2 pl-6")}>
        {replies.map((reply) => (
          <CommentThread
            key={reply.id}
            comment={reply}
            replies={allComments[reply.id] || []}
            allComments={allComments}
            currentUser={currentUser}
            level={level + 1}
          />
        ))}
      </div>
    )}
  </>
);

export { CommentThread };
