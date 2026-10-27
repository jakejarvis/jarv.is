import { type QueryClient, queryOptions } from "@tanstack/react-query";

import { getComments } from "@/lib/functions/comments";
import { getPostStats } from "@/lib/functions/stats";

/** A page's comments (`pageSlug` is e.g. "notes/dark-mode"). */
export const commentsQueryOptions = (pageSlug: string) =>
  queryOptions({
    queryKey: ["comments", pageSlug],
    queryFn: () => getComments({ data: pageSlug }),
  });

/** View and comment counts for every post, shared by every post row on /notes. */
export const postStatsQueryOptions = () =>
  queryOptions({
    queryKey: ["post-stats"],
    queryFn: () => getPostStats(),
    staleTime: 60_000,
  });

/** Refetches everything a comment change affects. */
export const invalidateComments = (queryClient: QueryClient, pageSlug: string) =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: commentsQueryOptions(pageSlug).queryKey }),
    queryClient.invalidateQueries({ queryKey: postStatsQueryOptions().queryKey }),
  ]);
