import { createFileRoute } from "@tanstack/react-router";

import { getPage } from "@/lib/functions/content";
import { mdxPageHead } from "@/lib/mdx-page-head";

export const Route = createFileRoute("/uses")({
  loader: () => getPage({ data: "uses" }),
  // content only changes on deploy
  staleTime: Infinity,
  head: ({ loaderData }) => mdxPageHead("/uses", loaderData),
  component: Page,
});

function Page() {
  const { Body } = Route.useLoaderData();
  return Body;
}
