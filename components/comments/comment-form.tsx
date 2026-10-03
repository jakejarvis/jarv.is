"use client";

import { IconInfoCircle, IconMarkdown } from "@tabler/icons-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { CommentUser } from "@/lib/data/comments";
import { createComment, updateComment } from "@/lib/server/comments";

import { CommentAvatar } from "./comment-avatar";

// Local form state shared by the create/reply/edit forms
const useCommentFormState = (initialContent: string = "") => {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();

  return { content, setContent, isPending, startTransition };
};

// Shared textarea component
const CommentTextarea = ({
  content,
  setContent,
  isPending,
  placeholder,
  ariaLabel,
}: {
  content: string;
  setContent: (value: string) => void;
  isPending: boolean;
  placeholder: string;
  ariaLabel: string;
}) => (
  <Textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder={placeholder}
    aria-label={ariaLabel}
    className="min-h-[4lh] w-full"
    disabled={isPending}
  />
);

// Current user's avatar
const CurrentUserAvatar = ({ user }: { user: CommentUser }) => (
  <div className="shrink-0">
    <CommentAvatar name={user.name} image={user.image} />
  </div>
);

// Submit button with pending state
const SubmitButton = ({
  isPending,
  disabled,
  pendingLabel,
  children,
}: {
  isPending: boolean;
  disabled?: boolean;
  pendingLabel: string;
  children: React.ReactNode;
}) => (
  <Button type="submit" disabled={isPending || disabled}>
    {isPending ? (
      <>
        <Spinner />
        {pendingLabel}
      </>
    ) : (
      children
    )}
  </Button>
);

// Markdown help popover (only shown for new comments)
const MarkdownHelp = () => (
  <div className="text-[0.8rem] leading-relaxed text-muted-foreground">
    <IconMarkdown className="mr-1.5 inline-block size-4 align-text-top" />
    <span className="max-md:hidden">Basic&nbsp;</span>
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="cursor-pointer font-semibold text-primary no-underline decoration-primary/40 decoration-2 underline-offset-4 hover:underline"
          >
            <span>Markdown</span>
            <span className="max-md:hidden">&nbsp;syntax</span>
          </button>
        }
      />
      <PopoverContent align="start">
        <p className="text-sm leading-loose">
          <IconInfoCircle className="mr-1.5 inline size-4.5 align-text-top" />
          Examples:
        </p>

        <ul className="my-2 list-inside list-disc pl-1 text-sm [&>li]:my-1.5 [&>li]:pl-1 [&>li]:text-nowrap [&>li::marker]:font-normal [&>li::marker]:text-muted-foreground">
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
            <span className="rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium">
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
  </div>
);

// New comment form - for creating top-level comments
const NewCommentForm = ({ slug, currentUser }: { slug: string; currentUser: CommentUser }) => {
  const { content, setContent, isPending, startTransition } = useCommentFormState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.add({ title: "Comment cannot be empty.", type: "error" });
      return;
    }

    startTransition(async () => {
      try {
        await createComment({ content, pageSlug: slug });
        toast.add({ title: "Comment posted!", type: "success" });
        setContent("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.add({
          title: "Failed to submit comment. Please try again.",
          type: "error",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-intent="create">
      <div className="flex gap-4">
        <CurrentUserAvatar user={currentUser} />

        <div className="min-w-0 flex-1 space-y-4">
          <CommentTextarea
            content={content}
            setContent={setContent}
            isPending={isPending}
            placeholder="Write your thoughts…"
            ariaLabel="Write a comment"
          />

          <div className="flex justify-between gap-4">
            <MarkdownHelp />

            <SubmitButton
              isPending={isPending}
              disabled={!content.trim()}
              pendingLabel="Posting..."
            >
              Comment
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

// Reply form - for replying to existing comments
const ReplyForm = ({
  slug,
  parentId,
  currentUser,
  onCancel,
  onSuccess,
}: {
  slug: string;
  parentId: string;
  currentUser: CommentUser;
  onCancel: () => void;
  onSuccess?: () => void;
}) => {
  const { content, setContent, isPending, startTransition } = useCommentFormState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.add({ title: "Comment cannot be empty.", type: "error" });
      return;
    }

    startTransition(async () => {
      try {
        await createComment({ content, parentId, pageSlug: slug });
        toast.add({ title: "Comment posted!", type: "success" });
        setContent("");
        onSuccess?.();
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.add({
          title: "Failed to submit comment. Please try again.",
          type: "error",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-intent="create">
      <div className="flex gap-4">
        <CurrentUserAvatar user={currentUser} />

        <div className="min-w-0 flex-1 space-y-4">
          <CommentTextarea
            content={content}
            setContent={setContent}
            isPending={isPending}
            placeholder="Reply to this comment…"
            ariaLabel="Write a reply"
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
              Cancel
            </Button>

            <SubmitButton
              isPending={isPending}
              disabled={!content.trim()}
              pendingLabel="Posting..."
            >
              Reply
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

// Edit comment form - for editing existing comments
const EditCommentForm = ({
  slug,
  commentId,
  initialContent,
  onCancel,
  onSuccess,
}: {
  slug: string;
  commentId: string;
  initialContent: string;
  onCancel: () => void;
  onSuccess?: () => void;
}) => {
  const { content, setContent, isPending, startTransition } = useCommentFormState(initialContent);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.add({ title: "Comment cannot be empty.", type: "error" });
      return;
    }

    startTransition(async () => {
      try {
        await updateComment(commentId, content);
        toast.add({ title: "Comment updated!", type: "success" });
        onSuccess?.();
      } catch (error) {
        console.error("Error updating comment:", error);
        toast.add({
          title: "Failed to update comment. Please try again.",
          type: "error",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-intent="edit" data-slug={slug}>
      <div className="min-w-0 flex-1 space-y-4">
        <CommentTextarea
          content={content}
          setContent={setContent}
          isPending={isPending}
          placeholder="Edit your comment…"
          ariaLabel="Edit your comment"
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>

          <SubmitButton isPending={isPending} disabled={!content.trim()} pendingLabel="Updating...">
            Edit
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export { NewCommentForm, ReplyForm, EditCommentForm };
