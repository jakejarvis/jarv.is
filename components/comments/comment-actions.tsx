"use client";

import { useState } from "react";
import { ReplyIcon, EditIcon, Trash2Icon, EllipsisIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Form from "./comment-form";
import { useSession } from "@/lib/auth-client";
import { deleteComment, type CommentWithUser } from "@/lib/server/comments";

const CommentActions = ({ comment }: { comment: CommentWithUser }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session } = useSession();

  if (!session) return null;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setIsDeleting(true);

    try {
      await deleteComment(comment.id);
      toast.success("Your comment has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-4">
      {isEditing ? (
        <Form
          slug={comment.pageSlug}
          initialContent={comment.content}
          commentId={comment.id}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsReplying(!isReplying)} className="h-8 px-2">
            <ReplyIcon className="mr-1 h-3.5 w-3.5" />
            Reply
          </Button>

          {session.user.id === comment.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <EllipsisIcon />
                  <span className="sr-only">Actions Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                  <EditIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} variant="destructive">
                  {isDeleting ? <Loader2Icon className="animate-spin" /> : <Trash2Icon />}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {isReplying && (
        <div className="mt-4">
          <Form
            slug={comment.pageSlug}
            parentId={comment.id}
            onCancel={() => setIsReplying(false)}
            onSuccess={() => setIsReplying(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CommentActions;
