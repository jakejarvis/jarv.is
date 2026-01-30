"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { toast } from "sonner";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MarkdownIcon } from "@/components/icons";
import { CommentAvatar } from "./comment-avatar";
import { useSession } from "@/lib/auth-client";
import { createComment, updateComment } from "@/lib/server/comments";

// Context for lifting form state to parent components
type CommentFormContextValue = {
  content: string;
  setContent: (value: string) => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
};

const CommentFormContext = createContext<CommentFormContextValue | null>(null);

// Provider for sharing form state with sibling components (preview, character counter, etc.)
const CommentFormProvider = ({
  children,
  initialContent = "",
}: {
  children: React.ReactNode;
  initialContent?: string;
}) => {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();

  return (
    <CommentFormContext.Provider value={{ content, setContent, isPending, startTransition }}>
      {children}
    </CommentFormContext.Provider>
  );
};

// Hook to access form state from context (for sibling components like preview panels)
const useCommentForm = () => {
  const context = useContext(CommentFormContext);
  if (!context) {
    throw new Error("useCommentForm must be used within a CommentFormProvider");
  }
  return context;
};

// Internal hook - uses context if available, otherwise creates local state
const useCommentFormState = (initialContent: string = "") => {
  const context = useContext(CommentFormContext);
  const [localContent, setLocalContent] = useState(initialContent);
  const [localIsPending, localStartTransition] = useTransition();

  // If wrapped in provider, use context; otherwise use local state
  if (context) {
    return context;
  }

  return {
    content: localContent,
    setContent: setLocalContent,
    isPending: localIsPending,
    startTransition: localStartTransition,
  };
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

// Current user's avatar (uses session)
const CurrentUserAvatar = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="shrink-0">
      <CommentAvatar name={session.user.name} image={session.user.image} />
    </div>
  );
};

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
        <Loader2Icon className="animate-spin" />
        {pendingLabel}
      </>
    ) : (
      children
    )}
  </Button>
);

// Markdown help popover (only shown for new comments)
const MarkdownHelp = () => (
  <p className="text-muted-foreground text-[0.8rem] leading-relaxed">
    <MarkdownIcon className="mr-1.5 inline-block size-4 align-text-top" />
    <span className="max-md:hidden">Basic&nbsp;</span>
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-primary decoration-primary/40 cursor-pointer font-semibold no-underline decoration-2 underline-offset-4 hover:underline"
        >
          <span>Markdown</span>
          <span className="max-md:hidden">&nbsp;syntax</span>
        </button>
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
            <span className="bg-muted rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium">`code`</span>
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
);

// New comment form - for creating top-level comments
const NewCommentForm = ({ slug }: { slug: string }) => {
  const { content, setContent, isPending, startTransition } = useCommentFormState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    startTransition(async () => {
      try {
        await createComment({ content, pageSlug: slug });
        toast.success("Comment posted!");
        setContent("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error("Failed to submit comment. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-intent="create">
      <div className="flex gap-4">
        <CurrentUserAvatar />

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

            <SubmitButton isPending={isPending} disabled={!content.trim()} pendingLabel="Posting...">
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
  onCancel,
  onSuccess,
}: {
  slug: string;
  parentId: string;
  onCancel: () => void;
  onSuccess?: () => void;
}) => {
  const { content, setContent, isPending, startTransition } = useCommentFormState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    startTransition(async () => {
      try {
        await createComment({ content, parentId, pageSlug: slug });
        toast.success("Comment posted!");
        setContent("");
        onSuccess?.();
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error("Failed to submit comment. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-intent="create">
      <div className="flex gap-4">
        <CurrentUserAvatar />

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

            <SubmitButton isPending={isPending} disabled={!content.trim()} pendingLabel="Posting...">
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
      toast.error("Comment cannot be empty.");
      return;
    }

    startTransition(async () => {
      try {
        await updateComment(commentId, content);
        toast.success("Comment updated!");
        onSuccess?.();
      } catch (error) {
        console.error("Error updating comment:", error);
        toast.error("Failed to update comment. Please try again.");
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

export { NewCommentForm, ReplyForm, EditCommentForm, CommentFormProvider, useCommentForm };
