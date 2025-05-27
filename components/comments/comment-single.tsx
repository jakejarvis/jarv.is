import { getImageProps } from "next/image";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "@/components/link";
import RelativeTime from "@/components/relative-time";
import Actions from "./comment-actions"; // Existing actions (edit/delete)
import CommentVoteButtons from "./comment-vote-buttons"; // Import the new component
import { remarkGfm, remarkSmartypants } from "@/lib/remark";
import { rehypeExternalLinks } from "@/lib/rehype";
import { cn } from "@/lib/utils";
import { type CommentWithUser } from "@/lib/server/comments";


const CommentSingle = ({ comment }: { comment: CommentWithUser }) => {
  const divId = `comment-${comment.id.substring(0, 8)}`;
  // Note: useSession and voting logic is now in CommentVoteButtons

  return (
    <div className="group scroll-mt-4" id={divId}>
      <div className="flex gap-4">
        <div className="shrink-0">
          <Avatar className="size-8 md:size-10">
            {comment.user.image && (
              <AvatarImage
                {...getImageProps({
                  src: comment.user.image,
                  alt: `@${comment.user.name}'s avatar`,
                  width: 40,
                  height: 40,
                }).props}
                width={undefined}
                height={undefined}
              />
            )}
            <AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Link href={`https://github.com/${comment.user.name}`} className="font-medium hover:no-underline">
              @{comment.user.name}
            </Link>
            <Link href={`#${divId}`} className="text-muted-foreground text-xs leading-none hover:no-underline">
              <RelativeTime date={comment.createdAt} />
            </Link>
          </div>

          <div
            className={cn(
              "isolate max-w-none text-[0.875rem] leading-relaxed",
              "[&_p]:my-5 [&_p]:first:mt-0 [&_p]:last:mb-0",
              "[&_a]:text-primary [&_a]:decoration-primary/40 [&_a]:no-underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:hover:underline",
              "[&_code]:bg-muted [&_code]:rounded-sm [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-medium",
              "group-has-data-[intent=edit]:hidden" // hides the rendered comment when its own edit form is active
            )}
          >
            <Markdown
              remarkPlugins={[remarkGfm, remarkSmartypants]}
              rehypePlugins={[[rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer nofollow" }]]}
              allowedElements={["p", "a", "em", "strong", "code", "pre", "blockquote", "del"]}
            >
              {comment.content}
            </Markdown>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <CommentVoteButtons
              commentId={comment.id}
              pageSlug={comment.pageSlug} // Ensure pageSlug is available on comment object
              initialUpvotes={comment.upvotes}
              initialDownvotes={comment.downvotes}
              // currentUserVoteInitial={comment.currentUserVote} // Pass this if available in CommentWithUser type
            />
            <Actions comment={comment} /> {/* Existing actions: edit, delete etc */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSingle;
