import { cache } from "react";
import path from "path";
import glob from "fast-glob";
import { unified } from "unified";
import { remarkHtml, remarkParse, remarkSmartypants } from "./remark-rehype-plugins";
import { decode } from "html-entities";
import { BASE_URL, POSTS_DIR } from "../config/constants";

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

// returns front matter and the **raw & uncompiled** markdown of a given slug
export const getFrontMatter = async (slug: string): Promise<FrontMatter> => {
  const { frontmatter } = await import(`../../${POSTS_DIR}/${slug}/index.mdx`);

  // process markdown title to html...
  const htmlTitle = await unified()
    .use(remarkParse)
    .use(remarkSmartypants)
    .use(remarkHtml, {
      sanitize: {
        // allow *very* limited markdown to be used in post titles
        tagNames: ["code", "em", "strong"],
      },
    })
    .process(frontmatter.title)
    .then((result) => result.toString().trim());

  // ...and then (sketchily) remove said html for a plaintext version:
  // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
  const title = decode(htmlTitle.replace(/<[^>]*>/g, ""));

  // return both the parsed YAML front matter (with a few amendments) and the raw, unparsed markdown content
  return {
    ...(frontmatter as Partial<FrontMatter>),
    // plain title without html or markdown syntax:
    title,
    // stylized title with limited html tags:
    htmlTitle,
    slug,
    date: new Date(frontmatter.date).toISOString(), // validate/normalize the date string provided from front matter
    permalink: `${BASE_URL}/${POSTS_DIR}/${slug}`,
  };
};

// use filesystem to get a simple list of all post slugs
export const getPostSlugs = cache(async (): Promise<string[]> => {
  // list all .mdx files in POSTS_DIR
  const mdxFiles = await glob("*/index.mdx", {
    cwd: path.join(process.cwd(), POSTS_DIR),
    dot: false,
  });

  // strip the .mdx extensions from filenames
  const slugs = mdxFiles.map((fileName) => fileName.replace(/\/index\.mdx$/, ""));

  return slugs;
});

// returns the parsed front matter of ALL posts, sorted reverse chronologically
export const getAllPosts = cache(async (): Promise<FrontMatter[]> => {
  // concurrently fetch the front matter of each post
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(getFrontMatter));

  // sort the results reverse chronologically and return
  return posts.sort((post1, post2) => new Date(post1.date).getTime() - new Date(post2.date).getTime());
});
