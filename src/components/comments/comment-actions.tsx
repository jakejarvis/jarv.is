"use client";

import { IconDots, IconEdit, IconMessageReply, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import type { CommentUser, CommentWithUser } from "@/lib/comments";
import { deleteComment } from "@/lib/functions/comments";
import { invalidateComments } from "@/lib/queries";

import { EditCommentForm, ReplyForm } from "./comment-form";

type ActionMode =
  | { type: "idle" }
  | { type: "replying" }
  | { type: "editing" }
  | { type: "confirming-delete" }
  | { type: "deleting" };

const CommentActions = ({
  comment,
  currentUser,
}: {
  comment: CommentWithUser;
  currentUser: CommentUser | null;
}) => {
  const [mode, setMode] = useState<ActionMode>({ type: "idle" });
  const queryClient = useQueryClient();

  if (!currentUser) return null;

  const handleDelete = async () => {
    setMode({ type: "deleting" });

    try {
      await deleteComment({ data: comment.id });
      await invalidateComments(queryClient, comment.pageSlug);
      toast.add({
        title: "Your comment has been deleted successfully.",
        type: "success",
      });
      setMode({ type: "idle" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.add({
        title: "Failed to delete comment. Please try again.",
        type: "error",
      });
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
            onClick={() =>
              setMode(mode.type === "replying" ? { type: "idle" } : { type: "replying" })
            }
          >
            <IconMessageReply />
            Reply
          </Button>

          {currentUser.id === comment.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                <IconDots />
                <span className="sr-only">Actions Menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setMode({ type: "editing" })}>
                  <IconEdit />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setMode({ type: "confirming-delete" })}
                  disabled={isDeleting}
                  variant="destructive"
                >
                  {isDeleting ? <Spinner /> : <IconTrash />}
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
            currentUser={currentUser}
            onCancel={() => setMode({ type: "idle" })}
            onSuccess={() => setMode({ type: "idle" })}
          />
        </div>
      )}

      <AlertDialog
        open={mode.type === "confirming-delete"}
        onOpenChange={(open) => !open && setMode({ type: "idle" })}
      >
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
