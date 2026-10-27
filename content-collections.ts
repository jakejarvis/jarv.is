import { defineCollection, defineConfig } from "@content-collections/core";
import { decode } from "html-entities";
import { unified } from "unified";
import { z } from "zod";

import { rehypeSanitize, rehypeStringify } from "@/lib/rehype";
import { remarkParse, remarkRehype, remarkSmartypants } from "@/lib/remark";

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

export default defineConfig({
  content: [posts],
});
