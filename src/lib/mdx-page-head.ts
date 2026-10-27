import { createHead } from "@/lib/metadata";

/** Per-page OG images in public/<page>/opengraph-image.* (other pages fall back to the site default). */
const OG_IMAGES: Record<string, { url: string; width: number; height: number; type: string }> = {
  "/cli": { url: "/cli/opengraph-image.png", width: 1546, height: 954, type: "image/png" },
  "/previously": {
    url: "/previously/opengraph-image.png",
    width: 2717,
    height: 1658,
    type: "image/png",
  },
  "/uses": { url: "/uses/opengraph-image.png", width: 3024, height: 1964, type: "image/png" },
  "/zip": { url: "/zip/opengraph-image.jpg", width: 2000, height: 1072, type: "image/jpeg" },
};

/** `head()` for a standalone MDX page (src/content/pages/<name>/index.mdx), from its frontmatter. */
export const mdxPageHead = (
  canonical: string,
  data: { frontmatter: { title?: string; description?: string } } | undefined,
) =>
  createHead({
    title: data?.frontmatter.title,
    description: data?.frontmatter.description,
    canonical,
    image: OG_IMAGES[canonical],
  });
