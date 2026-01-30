"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ReplyIcon, EditIcon, Trash2Icon, EllipsisIcon, Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EditCommentForm, ReplyForm } from "./comment-form";
import { useSession } from "@/lib/auth-client";
import { deleteComment, type CommentWithUser } from "@/lib/server/comments";

type ActionMode =
  | { type: "idle" }
  | { type: "replying" }
  | { type: "editing" }
  | { type: "confirming-delete" }
  | { type: "deleting" };

const CommentActions = ({ comment }: { comment: CommentWithUser }) => {
  const [mode, setMode] = useState<ActionMode>({ type: "idle" });

  const { data: session } = useSession();

  if (!session) return null;

  const handleDelete = async () => {
    setMode({ type: "deleting" });

    try {
      await deleteComment(comment.id);
      toast.success("Your comment has been deleted successfully.");
      setMode({ type: "idle" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment. Please try again.");
      setMode({ type: "idle" });
    }
  };

  const isDeleting = mode.type === "deleting";

  return (
    <div className="mt-4">
      {mode.type === "editing" ? (
        <EditCommentForm
          slug={comment.pageSlug}
          commentId={comment.id}
          initialContent={comment.content}
          onCancel={() => setMode({ type: "idle" })}
          onSuccess={() => setMode({ type: "idle" })}
        />
      ) : (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMode(mode.type === "replying" ? { type: "idle" } : { type: "replying" })}
          >
            <ReplyIcon />
            Reply
          </Button>

          {session.user.id === comment.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <EllipsisIcon />
                  <span className="sr-only">Actions Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setMode({ type: "editing" })}>
                  <EditIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setMode({ type: "confirming-delete" })}
                  disabled={isDeleting}
                  variant="destructive"
                >
                  {isDeleting ? <Loader2Icon className="animate-spin" /> : <Trash2Icon />}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {mode.type === "replying" && (
        <div className="mt-4">
          <ReplyForm
            slug={comment.pageSlug}
            parentId={comment.id}
            onCancel={() => setMode({ type: "idle" })}
            onSuccess={() => setMode({ type: "idle" })}
          />
        </div>
      )}

      <AlertDialog open={mode.type === "confirming-delete"} onOpenChange={(open) => !open && setMode({ type: "idle" })}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete comment?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export { CommentActions };
