import CommentItem from "./comment-item";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import type { CommentWithUser } from "@/lib/types";

const CommentThread = async ({
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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <CommentItem comment={comment} user={user || undefined} />

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
    </div>
  );
};

export default CommentThread;
