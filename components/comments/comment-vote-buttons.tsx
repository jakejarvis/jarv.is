"use client";

import { useState, useTransition } from "react"; // Removed useEffect
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";
import Button from "@/components/ui/button"; // Corrected: default import
import { cn } from "@/lib/utils";
import { addCommentVote, type VoteType } from "@/lib/server/comments";
import { useSession } from "@/lib/auth-client"; // Import useSession

interface CommentVoteButtonsProps {
  commentId: string;
  pageSlug: string;
  initialUpvotes: number;
  initialDownvotes: number;
  // Optional: if the parent component knows the user's current vote for this comment
  currentUserVoteInitial?: VoteType | null; 
}

const CommentVoteButtons = ({
  commentId,
  pageSlug,
  initialUpvotes,
  initialDownvotes,
  currentUserVoteInitial = null,
}: CommentVoteButtonsProps) => {
  const { session, status } = useSession(); // Use the hook
  const [isPending, startTransition] = useTransition();

  const [optimisticUpvotes, setOptimisticUpvotes] = useState(initialUpvotes);
  const [optimisticDownvotes, setOptimisticDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<VoteType | null>(currentUserVoteInitial);

  // useEffect for manual session fetching is removed.

  const handleVote = async (voteType: VoteType) => {
    if (!pageSlug) {
      console.error("pageSlug is missing");
      return;
    }

    startTransition(async () => {
      const originalUpvotes = optimisticUpvotes;
      const originalDownvotes = optimisticDownvotes;
      const originalUserVote = userVote;

      // Optimistic update logic (same as previously in comment-single)
      let newUpvotes = originalUpvotes;
      let newDownvotes = originalDownvotes;

      if (userVote === voteType) { // Un-voting
        setUserVote(null);
        if (voteType === "upvote") newUpvotes--;
        else newDownvotes--;
      } else { // New vote or changing vote
        setUserVote(voteType);
        if (voteType === "upvote") {
          newUpvotes++;
          if (userVote === "downvote") newDownvotes--; // Was previously a downvote
        } else { // voteType is "downvote"
          newDownvotes++;
          if (userVote === "upvote") newUpvotes--; // Was previously an upvote
        }
      }
      setOptimisticUpvotes(newUpvotes);
      setOptimisticDownvotes(newDownvotes);


      try {
        const response = await addCommentVote({
          commentId: commentId,
          voteType,
          userId: session?.user?.id, // Use user ID from client-side session
          pageSlug: pageSlug,
        });

        if (response.success && typeof response.upvotes === 'number' && typeof response.downvotes === 'number') {
          setOptimisticUpvotes(response.upvotes);
          setOptimisticDownvotes(response.downvotes);
          // userVote is already optimistically set. If server logic dictates a different userVote state
          // (e.g., vote rejected, or user has no vote after toggle), this needs alignment.
          // Current server `addCommentVote` doesn't explicitly return the user's final vote state,
          // but the counts reflect the change.
        } else {
          setOptimisticUpvotes(originalUpvotes);
          setOptimisticDownvotes(originalDownvotes);
          setUserVote(originalUserVote);
          console.error("Failed to vote:", response.message);
        }
      } catch (error) {
        setOptimisticUpvotes(originalUpvotes);
        setOptimisticDownvotes(originalDownvotes);
        setUserVote(originalUserVote);
        console.error("Error calling addCommentVote:", error);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("upvote")}
          disabled={isPending || status === 'loading' || status === 'unauthenticated'}
          className={cn("flex items-center gap-1 px-2", userVote === "upvote" ? "text-primary" : "")}
          aria-pressed={userVote === 'upvote'}
          title={status === 'unauthenticated' ? "Sign in to vote" : (status === 'loading' ? "Loading session..." : "Upvote")}
        >
          <ThumbsUpIcon className="size-4" />
          <span>{optimisticUpvotes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote("downvote")}
          disabled={isPending || status === 'loading' || status === 'unauthenticated'}
          className={cn("flex items-center gap-1 px-2", userVote === "downvote" ? "text-destructive" : "")}
          aria-pressed={userVote === 'downvote'}
          title={status === 'unauthenticated' ? "Sign in to vote" : (status === 'loading' ? "Loading session..." : "Downvote")}
        >
          <ThumbsDownIcon className="size-4" />
          <span>{optimisticDownvotes}</span>
        </Button>
      </div>
      {status === 'unauthenticated' && <p className="mt-1 text-xs text-muted-foreground">Sign in to vote on comments.</p>}
      {status === 'loading' && <p className="mt-1 text-xs text-muted-foreground">Loading session...</p>}
    </>
  );
};

export default CommentVoteButtons;
