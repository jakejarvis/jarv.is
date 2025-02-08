import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";
import pMap from "p-map";
import pMemoize from "p-memoize";
import matter from "gray-matter";
import { formatDate } from "./format-date";
import { metadata as defaultMetadata } from "../../app/layout";

// path to directory with .mdx files, relative to project root
const POSTS_DIR = "notes";

export type FrontMatter = {
  slug: string;
  permalink: string;
  date: string;
  title: string;
  htmlTitle?: string;
  description?: string;
  image?: string;
  tags?: string[];
  noComments?: boolean;
};

// returns front matter and the **raw & uncompiled** markdown of a given slug
export const getPostData = async (
  slug: string
): Promise<{
  frontMatter: FrontMatter;
  markdown: string;
}> => {
  const { unified } = await import("unified");
  const { remarkParse, remarkSmartypants, remarkRehype, rehypeSanitize, rehypeStringify } = await import(
    "./remark-rehype-plugins"
  );

  const fullPath = path.join(process.cwd(), POSTS_DIR, `${slug}.mdx`);
  const rawContent = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(rawContent);

  // allow *very* limited markdown to be used in post titles
  const parseTitle = async (title: string, allowedTags: string[] = []): Promise<string> => {
    return String(
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
    );
  };

  // process title as both plain and stylized
  const [title, htmlTitle] = await Promise.all([
    parseTitle(data.title),
    parseTitle(data.title, ["code", "em", "strong"]),
  ]);

  // return both the parsed YAML front matter (with a few amendments) and the raw, unparsed markdown content
  return {
    frontMatter: {
      ...(data as Partial<FrontMatter>),
      // zero markdown title:
      title,
      htmlTitle,
      slug,
      date: formatDate(data.date), // validate/normalize the date string provided from front matter
      permalink: new URL(`/${POSTS_DIR}/${slug}/`, defaultMetadata.metadataBase || "").href,
      image: data.image ? new URL(data.image, defaultMetadata.metadataBase || "").href : undefined,
    },
    markdown: content,
  };
};

export const getPostSlugs = pMemoize(async (): Promise<string[]> => {
  // list all .mdx files in POSTS_DIR
  const mdxFiles = await glob("*.mdx", {
    cwd: path.join(process.cwd(), POSTS_DIR),
    dot: false,
  });

  // strip the .mdx extensions from filenames
  const slugs = mdxFiles.map((fileName) => fileName.replace(/\.mdx$/, ""));

  return slugs;
});

// returns the parsed front matter of ALL posts, sorted reverse chronologically
export const getAllPosts = pMemoize(async (): Promise<FrontMatter[]> => {
  // for each post, query its front matter
  const data = await pMap(await getPostSlugs(), async (slug) => (await getPostData(slug)).frontMatter);

  // sort the results by date
  data.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return data;
});
