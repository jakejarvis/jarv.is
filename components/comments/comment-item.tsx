"use client";

import { useState } from "react";
import { getImageProps } from "next/image";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Trash2Icon, ReplyIcon, EditIcon, Loader2Icon, EllipsisIcon } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "@/components/link";
import CommentForm from "./comment-form";
import { deleteComment } from "@/lib/actions";
import { remarkGfm, remarkSmartypants } from "@/lib/remark";
import { rehypeExternalLinks } from "@/lib/rehype";
import { cn } from "@/lib/utils";
import type { CommentWithUser } from "@/lib/types";
import type { User } from "@supabase/supabase-js";

const CommentItem = ({ comment, user }: { comment: CommentWithUser; user?: User }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = user?.id === comment.user_id;
  const createdAt = new Date(comment.created_at);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

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
    <div className="group">
      <div className="flex gap-4">
        <div className="shrink-0">
          <Avatar className="size-8 md:size-10">
            {comment.user.avatar_url && (
              <AvatarImage
                {...getImageProps({
                  src: comment.user.avatar_url,
                  alt: `@${comment.user.full_name}'s avatar`,
                  width: 40,
                  height: 40,
                }).props}
                width={undefined}
                height={undefined}
              />
            )}
            <AvatarFallback>{comment.user.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Link href={`https://github.com/${comment.user.github_username}`} className="font-medium">
              {comment.user.username}
            </Link>
            <span className="text-muted-foreground text-xs">{timeAgo}</span>
          </div>

          {!isEditing && (
            <div
              className={cn(
                "isolate max-w-none text-[0.875rem] leading-relaxed",
                "[&_p]:my-5 [&_p]:first:mt-0 [&_p]:last:mb-0",
                "[&_a]:text-primary [&_a]:decoration-primary/40 [&_a]:no-underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:hover:underline",
                "[&_code]:bg-muted [&_code]:rounded-sm [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-medium"
              )}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkSmartypants]}
                rehypePlugins={[[rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer nofollow" }]]}
                allowedElements={["a", "code", "pre", "em", "strong", "p", "del"]}
              >
                {comment.content}
              </ReactMarkdown>
            </div>
          )}

          {user && (
            <div className="mt-4">
              {isEditing ? (
                <CommentForm
                  slug={comment.page_slug}
                  user={user}
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

                  {isAuthor && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                          <EllipsisIcon />
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
                  <CommentForm
                    slug={comment.page_slug}
                    user={user}
                    parentId={comment.id}
                    onCancel={() => setIsReplying(false)}
                    onSuccess={() => setIsReplying(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
