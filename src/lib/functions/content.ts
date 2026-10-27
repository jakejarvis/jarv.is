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
