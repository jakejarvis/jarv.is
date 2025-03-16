import { cache } from "react";
import path from "path";
import glob from "fast-glob";
import { decode } from "html-entities";
import { formatDate } from "./format-date";
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
  if (!(await getPostSlugs()).includes(slug)) {
    throw new Error(`No post found for slug: ${slug}`);
  }

  const { frontmatter } = await import(`../../${POSTS_DIR}/${slug}/index.mdx`);

  const { unified } = await import("unified");
  const { remarkParse, remarkSmartypants, remarkRehype, rehypeSanitize, rehypeStringify } = await import(
    "./remark-rehype-plugins"
  );

  // allow *very* limited markdown to be used in post titles
  const parseTitle = async (title: string, allowedTags: string[] = []): Promise<string> => {
    const newTitle = (
      await unified()
        .use(remarkParse)
        .use(remarkSmartypants, {
          quotes: true,
          dashes: "oldschool",
          backticks: false,
          ellipses: false,
        })
        .use(remarkRehype)
        .use(rehypeSanitize, { tagNames: allowedTags })
        .use(rehypeStringify)
        .process(title)
    ).toString();

    // assume if we don't want any html titles then we don't want encoded html entities either
    return allowedTags.length === 0 ? decode(newTitle) : newTitle;
  };

  // process title as both plain and stylized
  const [title, htmlTitle] = await Promise.all([
    parseTitle(frontmatter.title),
    parseTitle(frontmatter.title, ["code", "em", "strong"]),
  ]);

  // return both the parsed YAML front matter (with a few amendments) and the raw, unparsed markdown content
  return {
    ...(frontmatter as Partial<FrontMatter>),
    // plain title without html or markdown syntax:
    title,
    // stylized title with limited html tags:
    htmlTitle,
    slug,
    date: formatDate(frontmatter.date), // validate/normalize the date string provided from front matter
    permalink: `${BASE_URL}/${POSTS_DIR}/${slug}`,
  };
};

// use filesystem to get a simple list of all post slugs
export const getPostSlugs = cache(async (): Promise<string[]> => {
  // list all .mdx files in POSTS_DIR
  const mdxFiles = await glob("**/*.mdx", {
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
  const data = await Promise.all(slugs.map(async (slug) => await getFrontMatter(slug)));

  // sort the results by date
  data.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return data;
});
