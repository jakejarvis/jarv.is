"use client";

import { useState, useTransition } from "react";
import { getImageProps } from "next/image";
import { toast } from "sonner";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MarkdownIcon } from "@/components/icons";
import { useSession } from "@/lib/auth-client";
import { createComment, updateComment } from "@/lib/server/comments";

const CommentForm = ({
  slug,
  parentId,
  commentId,
  initialContent = "",
  onCancel,
  onSuccess,
}: {
  slug: string;
  parentId?: string;
  commentId?: string;
  initialContent?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}) => {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();
  const isEditing = !!commentId;
  const isReplying = !!parentId;

  const { data: session } = useSession();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            parentId,
            pageSlug: slug,
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
    <form onSubmit={handleSubmit} className="space-y-4" data-intent={isEditing ? "edit" : "create"}>
      <div className="flex gap-4">
        {!isEditing && (
          <div className="shrink-0">
            <Avatar className="size-10">
              {session?.user.image && (
                <AvatarImage
                  {...getImageProps({
                    src: session.user.image,
                    alt: `@${session.user.name}'s avatar`,
                    width: 40,
                    height: 40,
                  }).props}
                  width={undefined}
                  height={undefined}
                />
              )}
              <AvatarFallback>{session?.user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isReplying ? "Reply to this comment..." : "Write your thoughts..."}
            className="min-h-[4lh] w-full"
            disabled={isPending}
          />

          <div className="flex justify-between gap-4">
            <div>
              {/* Only show the markdown help text if the comment is new */}
              {!isEditing && !isReplying && (
                <p className="text-muted-foreground text-[0.8rem] leading-relaxed">
                  <MarkdownIcon className="mr-1.5 inline-block size-4 align-text-top" />
                  <span className="max-md:hidden">Basic&nbsp;</span>
                  <Popover>
                    <PopoverTrigger>
                      <span className="text-primary decoration-primary/40 cursor-pointer font-semibold no-underline decoration-2 underline-offset-4 hover:underline">
                        <span>Markdown</span>
                        <span className="max-md:hidden">&nbsp;syntax</span>
                      </span>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <p className="text-sm leading-loose">
                        <InfoIcon className="mr-1.5 inline size-4.5 align-text-top" />
                        Examples:
                      </p>

                      <ul className="[&>li::marker]:text-muted-foreground my-2 list-inside list-disc pl-1 text-sm [&>li]:my-1.5 [&>li]:pl-1 [&>li]:text-nowrap [&>li::marker]:font-normal">
                        <li>
                          <span className="font-bold">**bold**</span>
                        </li>
                        <li>
                          <span className="italic">_italics_</span>
                        </li>
                        <li>
                          [
                          <a href="https://jarv.is" target="_blank" rel="noopener" className="hover:no-underline">
                            links
                          </a>
                          ](https://jarv.is)
                        </li>
                        <li>
                          <span className="bg-muted rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium">
                            `code`
                          </span>
                        </li>
                        <li>
                          ~~<span className="line-through">strikethrough</span>~~
                        </li>
                      </ul>

                      <p className="text-sm leading-loose">
                        <a
                          href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more.
                        </a>
                      </p>
                    </PopoverContent>
                  </Popover>
                  <span>&nbsp;is supported</span>
                  <span className="max-md:hidden">&nbsp;here</span>
                  <span>.</span>
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
                    <Loader2Icon className="animate-spin" />
                    {isEditing ? "Updating..." : "Posting..."}
                  </>
                ) : isEditing ? (
                  "Edit"
                ) : isReplying ? (
                  "Reply"
                ) : (
                  "Comment"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export { CommentForm };
