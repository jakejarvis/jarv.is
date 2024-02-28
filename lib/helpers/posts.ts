import path from "path";
import fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import glob from "fast-glob";
import pMap from "p-map";
import pMemoize from "p-memoize";
import matter from "gray-matter";
import { formatDate } from "./format-date";
import { minifier } from "./minifier";
import type { PostFrontMatter, PostWithSource } from "../../types";

// path to directory with .mdx files, relative to project root
export const POSTS_DIR = "notes";

// returns front matter and the **raw & uncompiled** markdown of a given slug
export const getPostData = async (
  slug: string
): Promise<{
  frontMatter: PostFrontMatter;
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
      ...(data as Partial<PostFrontMatter>),
      // zero markdown title:
      title,
      htmlTitle,
      slug,
      permalink: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/${POSTS_DIR}/${slug}/`,
      date: formatDate(data.date), // validate/normalize the date string provided from front matter
    },
    markdown: content,
  };
};

// fully parses MDX into JS and returns *everything* about a post
export const compilePost = async (slug: string): Promise<PostWithSource> => {
  const { remarkGfm, remarkSmartypants, remarkUnwrapImages, rehypeSlug, rehypePrism } = await import(
    "./remark-rehype-plugins"
  );

  const { frontMatter, markdown } = await getPostData(slug);

  const { compiledSource } = await serialize(markdown, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [
        // @ts-ignore
        [remarkGfm, { singleTilde: false }],
        [
          // @ts-ignore
          remarkSmartypants,
          {
            quotes: true,
            dashes: "oldschool",
            backticks: false,
            ellipses: false,
          },
        ],
        // @ts-ignore
        [remarkUnwrapImages],
      ],
      rehypePlugins: [
        // @ts-ignore
        [rehypeSlug],
        // @ts-ignore
        [rehypePrism, { ignoreMissing: true }],
      ],
    },
  });

  return {
    frontMatter,
    source: {
      // save some bytes
      compiledSource: minifier(compiledSource),
    },
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
export const getAllPosts = pMemoize(async (): Promise<PostFrontMatter[]> => {
  // for each post, query its front matter
  const data = await pMap(await getPostSlugs(), async (slug) => (await getPostData(slug)).frontMatter);

  // sort the results by date
  data.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return data;
});
