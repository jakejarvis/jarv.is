import { createFileRoute } from "@tanstack/react-router";

import { getProjects } from "@/lib/functions/content";
import { createHead } from "@/lib/metadata";

export const Route = createFileRoute("/projects")({
  loader: () => getProjects(),
  // live data: refetch on client navigations after a few minutes (the CDN absorbs repeat requests)
  staleTime: 5 * 60 * 1000,
  head: () =>
    createHead({
      title: "Projects",
      description: `Most-starred repositories by @${import.meta.env.VITE_GITHUB_USERNAME} on GitHub`,
      canonical: "/projects",
    }),
  component: Page,
});

function Page() {
  const { Body } = Route.useLoaderData();
  return Body;
}
