import { headers } from "next/headers";
import Link from "next/link"; // Import Link for navigation
import { ListFilter } from "lucide-react"; // Icon for dropdown trigger
import Form from "./comment-form";
import Thread from "./comment-thread";
import SignIn from "./sign-in";
import { auth } from "@/lib/auth";
import { getComments, type CommentWithUser, type SortByType } from "@/lib/server/comments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/components/ui/button"; // Corrected: default import

interface CommentsProps {
  slug: string;
  searchParams?: {
    sortBy?: SortByType;
  };
}

const Comments = async ({ slug, searchParams }: CommentsProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sortBy = searchParams?.sortBy || "newest";
  const comments = await getComments(slug, sortBy);

  const commentsByParentId = comments.reduce(
    (acc, comment) => {
      const parentId = comment.parentId || "root";
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(comment);
      return acc;
    },
    {} as Record<string, CommentWithUser[]>
  );

  const rootComments = commentsByParentId["root"] || [];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Comments ({comments.length})</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter className="mr-2 size-4" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/${slug}?sortBy=newest#comments`} className={sortBy === "newest" ? "font-bold" : ""}>Newest</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${slug}?sortBy=oldest#comments`} className={sortBy === "oldest" ? "font-bold" : ""}>Oldest</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${slug}?sortBy=mostLiked#comments`} className={sortBy === "mostLiked" ? "font-bold" : ""}>Most Liked</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {session ? (
        <Form slug={slug} />
      ) : (
        <div className="bg-muted/40 flex flex-col items-center justify-center gap-y-4 rounded-lg p-6">
          <p className="text-center font-medium">Join the discussion by signing in:</p>
          <SignIn callbackPath={`/${slug}#comments`} />
        </div>
      )}

      {rootComments.length > 0 ? (
        <div className="space-y-6">
          {rootComments.map((comment: CommentWithUser) => (
            <Thread
              key={comment.id}
              comment={comment}
              replies={commentsByParentId[comment.id] || []}
              allComments={commentsByParentId}
            />
          ))}
        </div>
      ) : (
        <div className="text-foreground/80 py-8 text-center text-lg font-medium tracking-tight">
          Be the first to comment!
        </div>
      )}
    </>
  );
};

export default Comments;

// Helper to ensure the anchor tag #comments is part of the URL for Link components
// This might not be strictly necessary if page structure keeps comments in view,
// but good for UX if sorting causes a full page reload/navigation.
// Note: The Link components above directly include #comments in the href.
