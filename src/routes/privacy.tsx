import { createFileRoute } from "@tanstack/react-router";

import { getPage } from "@/lib/functions/content";
import { mdxPageHead } from "@/lib/mdx-page-head";

export const Route = createFileRoute("/privacy")({
  loader: () => getPage({ data: "privacy" }),
  // content only changes on deploy
  staleTime: Infinity,
  head: ({ loaderData }) => mdxPageHead("/privacy", loaderData),
  component: Page,
});

function Page() {
  const { Body } = Route.useLoaderData();
  return Body;
}
