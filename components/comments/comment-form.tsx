"use client";

import { useState, useTransition } from "react";
import { getImageProps } from "next/image";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import Link from "@/components/link";
import { MarkdownIcon } from "@/components/icons";
import { createComment, updateComment } from "@/lib/actions";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";

const CommentForm = ({
  slug,
  user,
  parentId,
  commentId,
  initialContent = "",
  onCancel,
  onSuccess,
}: {
  slug: string;
  user: User;
  parentId?: string;
  commentId?: string;
  initialContent?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}) => {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();
  const isEditing = !!commentId;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    startTransition(async () => {
      try {
        if (isEditing) {
          await updateComment(commentId, content);
          toast.success("Comment updated!");
        } else {
          await createComment({
            content,
            // eslint-disable-next-line camelcase
            page_slug: slug,
            // eslint-disable-next-line camelcase
            parent_id: parentId,
          });
          toast.success("Comment posted!");
        }

        // Reset form if not editing
        if (!isEditing) {
          setContent("");
        }

        // Call success callback if provided
        onSuccess?.();
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error("Failed to submit comment. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        {!isEditing && (
          <div className="shrink-0">
            <Avatar className="size-10">
              {user.user_metadata.full_name && (
                <AvatarImage
                  {...getImageProps({
                    src: user.user_metadata.avatar_url,
                    alt: `@${user.user_metadata.full_name}'s avatar`,
                    width: 40,
                    height: 40,
                  }).props}
                  width={undefined}
                  height={undefined}
                />
              )}
              <AvatarFallback>{user.user_metadata.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={parentId ? "Reply to this comment..." : "Write your thoughts..."}
            className="min-h-[100px] w-full"
            disabled={isPending}
          />

          <div className="flex justify-between gap-4">
            <div>
              {/* Only show the markdown help text if the comment is new */}
              {!commentId && !parentId && (
                <p className="text-muted-foreground text-[0.8rem] leading-relaxed">
                  <MarkdownIcon className="mr-1 inline-block size-4 align-text-top" />
                  Basic{" "}
                  <Link href="https://commonmark.org/help/" title="Markdown reference sheet" className="font-semibold">
                    Markdown syntax
                  </Link>{" "}
                  is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
                  <Link href="https://jarv.is" className="hover:no-underline">
                    links
                  </Link>
                  ](https://jarv.is), and <code>`code`</code>.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              {(onCancel || isEditing) && (
                <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isPending || !content.trim()}>
                {isPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Updating..." : "Posting..."}
                  </>
                ) : isEditing ? (
                  "Edit Comment"
                ) : parentId ? (
                  "Reply"
                ) : (
                  "Post Comment"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
