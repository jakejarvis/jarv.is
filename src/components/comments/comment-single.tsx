import { RelativeTime } from "@/components/relative-time";
import type { CommentUser, CommentWithUser } from "@/lib/comments";
import { cn } from "@/lib/utils";

import { CommentActions } from "./comment-actions";
import { CommentAvatar } from "./comment-avatar";

const CommentSingle = ({
  comment,
  currentUser,
}: {
  comment: CommentWithUser;
  currentUser: CommentUser | null;
}) => {
  const divId = `comment-${comment.id.substring(0, 8)}`;

  return (
    <div className="group scroll-mt-4" id={divId}>
      <div className="flex gap-4">
        <div className="shrink-0">
          <CommentAvatar
            name={comment.user.name}
            image={comment.user.image}
            className="size-8 md:size-10"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <a
              href={`https://github.com/${comment.user.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:no-underline"
            >
              @{comment.user.name}
            </a>
            <a
              href={`#${divId}`}
              className="text-xs leading-none text-muted-foreground hover:no-underline"
            >
              <RelativeTime date={comment.createdAt} />
            </a>
          </div>

          <div
            className={cn(
              "isolate max-w-none text-[0.875rem] leading-relaxed",
              "[&_p]:my-5 [&_p]:first:mt-0 [&_p]:last:mb-0",
              "[&_a]:text-primary [&_a]:no-underline [&_a]:decoration-primary/40 [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:hover:underline",
              "[&_code]:rounded-sm [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-medium",
              "group-has-data-[intent=edit]:hidden", // hides the rendered comment when its own edit form is active
            )}
            // rendered and sanitized on the server (src/lib/data/comments.server.ts)
            dangerouslySetInnerHTML={{ __html: comment.contentHtml }}
          />

          <CommentActions comment={comment} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export { CommentSingle };
