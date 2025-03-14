import path from "path";
import glob from "fast-glob";
import pMap from "p-map";
import pMemoize from "p-memoize";
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
    parseTitle(frontmatter.title),
    parseTitle(frontmatter.title, ["code", "em", "strong"]),
  ]);

  // return both the parsed YAML front matter (with a few amendments) and the raw, unparsed markdown content
  return {
    ...(frontmatter as Partial<FrontMatter>),
    // zero markdown title:
    title,
    htmlTitle,
    slug,
    date: formatDate(frontmatter.date), // validate/normalize the date string provided from front matter
    permalink: `${BASE_URL}/${POSTS_DIR}/${slug}`,
  };
};

export const getPostSlugs = pMemoize(async (): Promise<string[]> => {
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
export const getAllPosts = pMemoize(async (): Promise<FrontMatter[]> => {
  // for each post, query its front matter
  const data = await pMap(await getPostSlugs(), async (slug) => await getFrontMatter(slug));

  // sort the results by date
  data.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return data;
});
