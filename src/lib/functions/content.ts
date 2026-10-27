import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";
import { z } from "zod";

/**
 * Content only changes on deploy, and Vercel's CDN cache is scoped to a deployment, so rendered content can be cached
 * there indefinitely. Browsers always revalidate.
 */
const setContentCacheHeaders = () => {
  setResponseHeaders(
    new Headers({
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
    }),
  );
};

/** A post's rendered body, called by the post route's loader (at prerender time, then on client navigations). */
export const getNote = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: slug }) => {
    setContentCacheHeaders();
    const { renderNote } = await import("@/lib/content/render.server");
    return renderNote(slug);
  });

/** A standalone MDX page's rendered body and frontmatter. */
export const getPage = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    setContentCacheHeaders();
    const { renderPage } = await import("@/lib/content/render.server");
    return renderPage(name);
  });

/**
 * The /projects page body, rendered from live GitHub data. Cached by Vercel's CDN for a minute and served stale for up
 * to an hour while it refreshes (the old Next.js `cacheLife("minutes")`).
 */
export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  // without a token there's barely anything to show, so 404 rather than fail
  if (!process.env.GITHUB_TOKEN) {
    console.error("[functions/content] can't fetch anything from GitHub without GITHUB_TOKEN set");
    throw notFound();
  }

  setResponseHeaders(
    new Headers({
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Vercel-CDN-Cache-Control": "public, max-age=60, stale-while-revalidate=3600",
    }),
  );
  const { renderProjects } = await import("@/lib/content/render.server");
  return renderProjects();
});
