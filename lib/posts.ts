import { env } from "@/lib/env";
import { cache } from "react";
import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";
import { unified } from "unified";
import {
  remarkParse,
  remarkSmartypants,
  remarkFrontmatter,
  remarkRehype,
  remarkMdx,
  remarkStripMdxImportsExports,
} from "@/lib/remark";
import { decode } from "html-entities";
import { POSTS_DIR } from "@/lib/config/constants";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export type FrontMatter = {
  slug: string;
  permalink: string;
  date: string;
  title: string;
  htmlTitle?: string;
  description?: string;
  tags?: string[];
  image?: string;
  noComments?: boolean;
};

/** Use filesystem to get a simple list of all post slugs */
export const getSlugs = cache(async (): Promise<string[]> => {
  // list all .mdx files in POSTS_DIR
  const mdxFiles = await glob("*/index.mdx", {
    cwd: path.join(process.cwd(), POSTS_DIR),
    dot: false,
  });

  // strip the .mdx extensions from filenames
  const slugs = mdxFiles.map((fileName) => fileName.replace(/\/index\.mdx$/, ""));

  return slugs;
});

// overloaded to return either the front matter of a single post or ALL posts
export const getFrontMatter: {
  /**
   * Parses and returns the front matter of ALL posts, sorted reverse chronologically
   */
  (): Promise<FrontMatter[]>;
  /**
   * Parses and returns the front matter of a given slug, or undefined if the slug does not exist
   */
  (slug: string): Promise<FrontMatter | undefined>;
} = cache(
  async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slug?: any
  ): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<any> => {
    if (typeof slug === "string") {
      try {
        const { frontmatter } = await import(`../${POSTS_DIR}/${slug}/index.mdx`);

        // process markdown title to html...
        const htmlTitle = await unified()
          .use(remarkParse)
          .use(remarkSmartypants)
          .use(remarkRehype)
          .use(rehypeSanitize, {
            // allow *very* limited markdown to be used in post titles
            tagNames: ["code", "em", "strong"],
          })
          .use(rehypeStringify)
          .process(frontmatter.title)
          .then((result) => result.toString().trim());

        // ...and then (sketchily) remove said html for a plaintext version:
        // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
        const title = decode(htmlTitle.replace(/<[^>]*>/g, ""));

        return {
          ...(frontmatter as Partial<FrontMatter>),
          // plain title without html or markdown syntax:
          title,
          // stylized title with limited html tags:
          htmlTitle,
          slug,
          // validate/normalize the date string provided from front matter
          date: new Date(frontmatter.date).toISOString(),
          permalink: `${env.NEXT_PUBLIC_BASE_URL}/${POSTS_DIR}/${slug}`,
        } as FrontMatter;
      } catch (error) {
        console.error(`Failed to load front matter for post with slug "${slug}":`, error);
        return undefined;
      }
    }

    if (!slug) {
      // concurrently fetch the front matter of each post
      const slugs = await getSlugs();
      const posts = await Promise.all(slugs.map(getFrontMatter));

      // sort the results reverse chronologically and return
      return posts.sort(
        (post1, post2) => new Date(post2!.date).getTime() - new Date(post1!.date).getTime()
      ) as FrontMatter[];
    }

    throw new Error("getFrontMatter() called with invalid argument.");
  }
);

/** Returns the content of a post with very limited processing to include in RSS feeds */
export const getContent = cache(async (slug: string): Promise<string | undefined> => {
  try {
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
      .process(await fs.readFile(path.join(process.cwd(), `${POSTS_DIR}/${slug}/index.mdx`)));

    // convert the parsed content to a string with "safe" HTML
    return content.toString().replaceAll("/* prettier-ignore */", "").replaceAll("<p></p>", "").trim();
  } catch (error) {
    console.error(`Failed to load/parse content for post with slug "${slug}":`, error);
    return undefined;
  }
});
