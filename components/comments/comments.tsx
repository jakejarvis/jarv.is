import { Suspense } from "react";
import Toaster from "@/components/ui/sonner";
import CommentsList from "./comments-list";
import CommentForm from "./comment-form";
import CommentSkeleton from "./comment-skeleton";
import AuthButtons from "./auth-buttons";
import { createClient } from "@/lib/supabase/server";

const Comments = async ({ slug }: { slug: string }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section id="comments" className="isolate mt-8 min-h-36 w-full border-t-2 pt-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {!user ? (
          <div className="bg-muted/40 flex flex-col items-center justify-center rounded-lg p-6">
            <p className="mb-4 text-center font-medium">Join the discussion by signing in:</p>
            <AuthButtons slug={slug} />
          </div>
        ) : (
          <CommentForm slug={slug} user={user} />
        )}

        <Suspense fallback={<CommentsLoading />}>
          <CommentsList slug={slug} />
        </Suspense>
      </div>

      <Toaster position="bottom-center" />
    </section>
  );
};

const CommentsLoading = () => {
  return (
    <div className="space-y-6">
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
};

export default Comments;
