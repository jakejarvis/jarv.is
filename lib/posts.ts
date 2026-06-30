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

const sortPosts = (posts: Post[]): Post[] => {
  return posts.toSorted(
    (post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime(),
  );
};

/** Use generated content collections data to get all post slugs. */
export const getSlugs = async (): Promise<string[]> => {
  "use cache";

  return allPosts.map((post) => post.slug);
};

export const getPost = async (slug: string): Promise<Post | undefined> => {
  "use cache";

  return allPosts.find((post) => post.slug === slug);
};

export const getFrontMatter: {
  /**
   * Returns the front matter of ALL posts, sorted reverse chronologically.
   */
  (): Promise<FrontMatter[]>;
  /**
   * Returns the front matter of a given slug, or undefined if the slug does not exist.
   */
  (slug: string): Promise<FrontMatter | undefined>;
} = (async (slug?: string) => {
  "use cache";

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
    return sortPosts(allPosts).map(toFrontMatter);
  }

  throw new Error("getFrontMatter() called with invalid argument.");
}) as typeof getFrontMatter;

/** Returns the sanitized HTML content of a post for RSS feeds. */
export const getContent = async (slug: string): Promise<string | undefined> => {
  "use cache";

  return allPosts.find((post) => post.slug === slug)?.feedHtml;
};
