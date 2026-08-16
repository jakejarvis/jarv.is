import { allPosts } from "content-collections";

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

export type Post = (typeof allPosts)[number];

/** Path to directory with .mdx files, relative to project root. */
export const POSTS_DIR = "notes" as const;

/** Use generated content collections data to get all post slugs. */
export const getSlugs = (): string[] => {
  return allPosts.map((post) => post.slug);
};

/** Returns the post for a given slug, or undefined if the slug does not exist. */
export const getPost = (slug: string): Post | undefined => {
  return allPosts.find((post) => post.slug === slug);
};

/**
 * Returns the front matter of ALL posts, sorted reverse chronologically.
 */
export function getFrontMatter(): FrontMatter[];
/**
 * Returns the front matter of a given slug, or undefined if the slug does not exist.
 */
export function getFrontMatter(slug: string): FrontMatter | undefined;
export function getFrontMatter(slug?: string): FrontMatter[] | FrontMatter | undefined {
  const toFrontMatter = (post: Post): FrontMatter => ({
    slug: post.slug,
    permalink: post.permalink,
    date: post.date,
    title: post.title,
    htmlTitle: post.htmlTitle,
    description: post.description,
    tags: post.tags,
    image: post.image,
    noComments: post.noComments,
  });

  if (typeof slug === "string") {
    const matchedPost = allPosts.find((candidate) => candidate.slug === slug);
    return matchedPost ? toFrontMatter(matchedPost) : undefined;
  }

  if (!slug) {
    return allPosts
      .toSorted((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())
      .map(toFrontMatter);
  }

  throw new Error("getFrontMatter() called with invalid argument.");
}
