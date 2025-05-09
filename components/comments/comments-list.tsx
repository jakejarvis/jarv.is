import CommentThread from "./comment-thread";
import { createClient } from "@/lib/supabase/server";
import type { CommentWithUser } from "@/lib/types";

const CommentsList = async ({ slug }: { slug: string }) => {
  const supabase = await createClient();

  // Fetch all comments for this post
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      user:users(id, username, full_name, avatar_url, github_username)
    `
    )
    .eq("page_slug", slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    return (
      <div className="bg-muted text-destructive rounded-md p-4 text-center font-medium">
        Failed to load comments. Please try again later.
      </div>
    );
  }

  // Group comments by parent_id to create threads
  const commentsByParentId = comments.reduce(
    (acc, comment) => {
      const parentId = comment.parent_id || "root";
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(comment);
      return acc;
    },
    {} as Record<string, CommentWithUser[]>
  );

  const rootComments = commentsByParentId["root"] || [];

  if (rootComments.length === 0) {
    return <div className="text-muted-foreground py-8 text-center">Be the first to comment!</div>;
  }

  return (
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
  );
};

export default CommentsList;
