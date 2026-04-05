import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import { decode } from "html-entities";
import rehypeSlug from "rehype-slug";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeWrapper from "rehype-wrapper";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSmartypants from "remark-smartypants";
import remarkStripMdxImportsExports from "remark-strip-mdx-imports-exports";
import { unified } from "unified";
import { z } from "zod";

const BASE_URL = process.env.VITE_BASE_URL || "https://jarv.is";

/** Tailwind prose classes applied to blog post content (matches next.config.ts) */
const PROSE_CLASSES = [
  "prose prose-neutral dark:prose-invert prose-sm max-w-none",
  "prose-headings:font-semibold prose-headings:text-primary prose-headings:tracking-tight",
  "prose-p:text-foreground/90 prose-strong:text-primary prose-li:text-foreground/80",
  "prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4",
  "prose-blockquote:[&_p]:text-foreground/75 prose-blockquote:*:before:content-none prose-blockquote:*:after:content-none",
  "prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
  "[&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]",
].join(" ");

/**
 * Process a markdown title string into limited HTML (code, em, strong only).
 * Replicates the pipeline from lib/posts.ts
 */
const processTitle = async (
  rawTitle: string,
): Promise<{ title: string; htmlTitle: string }> => {
  const htmlTitle = await unified()
    .use(remarkParse)
    .use(remarkSmartypants)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      tagNames: ["code", "em", "strong"],
    })
    .use(rehypeStringify)
    .process(rawTitle)
    .then((result) => result.toString().trim());

  const title = decode(htmlTitle.replace(/<[^>]*>/g, ""));

  return { title, htmlTitle };
};

/**
 * Generate sanitized HTML from raw MDX content for RSS feeds.
 * Replicates getContent() from lib/posts.ts
 */
const generateRssHtml = async (rawContent: string): Promise<string> => {
  const content = await unified()
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
    .process(rawContent);

  return content
    .toString()
    .replaceAll("/* prettier-ignore */", "")
    .replaceAll("<p></p>", "")
    .trim();
};

const posts = defineCollection({
  name: "posts",
  directory: "notes",
  include: "*/index.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    content: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    noComments: z.boolean().optional(),
  }),
  transform: async (doc, ctx) => {
    const slug = doc._meta.directory;
    const projectRoot = process.cwd();

    // Compile MDX with the full remark/rehype plugin chain
    const mdx = await compileMDX(ctx, doc, {
      cwd: projectRoot,
      remarkPlugins: [remarkGfm, remarkSmartypants],
      rehypePlugins: [
        rehypeUnwrapImages,
        rehypeSlug,
        [rehypeWrapper, { className: PROSE_CLASSES }],
        [
          rehypeShiki,
          {
            themes: { light: "github-light", dark: "github-dark" },
          },
        ],
      ],
    });

    // Process title to html and plaintext versions
    const { title, htmlTitle } = await processTitle(doc.title);

    // Generate sanitized HTML for RSS feeds
    const rssContent = await generateRssHtml(doc.content);

    return {
      ...doc,
      title,
      htmlTitle,
      slug,
      date: new Date(doc.date).toISOString(),
      permalink: `${BASE_URL}/notes/${slug}`,
      mdx,
      rssContent,
    };
  },
});

export default defineConfig({
  content: [posts],
});
