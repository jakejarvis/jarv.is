import { defineCollection, defineConfig } from "@content-collections/core";
import { decode } from "html-entities";
import { unified } from "unified";
import { z } from "zod";

import { rehypeSanitize, rehypeStringify } from "@/lib/rehype";
import {
  remarkFrontmatter,
  remarkMdx,
  remarkParse,
  remarkRehype,
  remarkSmartypants,
  remarkStripMdxImportsExports,
} from "@/lib/remark";

const POSTS_DIR = "notes" as const;

const parseableDate = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "Invalid date string",
});

const titleToHtml = async (title: string): Promise<string> => {
  const parsedTitle = await unified()
    .use(remarkParse)
    .use(remarkSmartypants)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      tagNames: ["code", "em", "strong"],
    })
    .use(rehypeStringify)
    .process(title);

  return parsedTitle.toString().trim();
};

const contentToFeedHtml = async (content: string): Promise<string> => {
  const parsedContent = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkStripMdxImportsExports)
    .use(remarkFrontmatter)
    .use(remarkSmartypants)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      tagNames: [
        "p",
        "a",
        "em",
        "strong",
        "code",
        "pre",
        "blockquote",
        "del",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "hr",
      ],
    })
    .use(rehypeStringify)
    .process(content);

  return parsedContent
    .toString()
    .replaceAll("/* prettier-ignore */", "")
    .replaceAll("<p></p>", "")
    .trim();
};

const posts = defineCollection({
  name: "posts",
  directory: POSTS_DIR,
  include: "*/index.mdx",
  schema: z.object({
    content: z.string(),
    date: parseableDate,
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    noComments: z.boolean().optional(),
  }),
  transform: async ({ content: _content, ...post }) => {
    // the body is compiled separately by @mdx-js/rollup, so it's left out to keep this collection small enough to
    // import anywhere (including client bundles)
    const slug = post["_meta"].directory.replace(`${POSTS_DIR}/`, "");
    const htmlTitle = await titleToHtml(post.title);
    const title = decode(htmlTitle.replace(/<[^>]*>/g, ""));
    return {
      ...post,
      title,
      htmlTitle,
      slug,
      date: new Date(post.date).toISOString(),
    };
  },
});

/**
 * Each post's body as simplified, sanitized HTML for the RSS/Atom feeds. Kept out of `posts` so that collection stays
 * small enough to import anywhere; only the (prerendered) feed routes import this one.
 */
const feeds = defineCollection({
  name: "feeds",
  directory: POSTS_DIR,
  include: "*/index.mdx",
  schema: z.object({
    content: z.string(),
  }),
  transform: async ({ content, _meta }) => ({
    slug: _meta.directory.replace(`${POSTS_DIR}/`, ""),
    feedHtml: await contentToFeedHtml(content),
  }),
});

export default defineConfig({
  content: [posts, feeds],
});
