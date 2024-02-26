import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type PostFrontMatter = {
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

export type PostWithSource = {
  // yaml metadata
  frontMatter: PostFrontMatter;

  // the final, compiled JSX by next-mdx-remote; see lib/helpers/posts.ts
  source: Partial<Pick<MDXRemoteSerializeResult<Record<string, never>, Record<string, never>>>>;
};

export type PostsByYear = {
  [year: string]: PostFrontMatter[];
};
