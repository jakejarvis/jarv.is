import "dotenv/config";
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

const getBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL must be set to build post permalinks.");
  }

  return baseUrl;
};

const parseableDate = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: "Invalid date string",
});

const titleToHtml = async (title: string): Promise<string> => {
  return unified()
    .use(remarkParse)
    .use(remarkSmartypants)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      tagNames: ["code", "em", "strong"],
    })
    .use(rehypeStringify)
    .process(title)
    .then((result) => result.toString().trim());
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
        "img",
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
  transform: async (post) => {
    const slug = post["_meta"].directory.replace(`${POSTS_DIR}/`, "");
    const htmlTitle = await titleToHtml(post.title);
    const title = decode(htmlTitle.replace(/<[^>]*>/g, ""));
    return {
      ...post,
      feedHtml: await contentToFeedHtml(post.content),
      title,
      htmlTitle,
      slug,
      date: new Date(post.date).toISOString(),
      permalink: `${getBaseUrl()}/${POSTS_DIR}/${slug}`,
    };
  },
});

export default defineConfig({
  content: [posts],
});
