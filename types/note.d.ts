import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type NoteFrontMatter = {
  slug: string;
  permalink: string;
  date: string;
  title: string;
  htmlTitle?: string;
  description?: string;
  image?: string;
  tags?: string[];
  readingMins?: number;
  noComments?: boolean;
};

export type Note = {
  // yaml metadata
  frontMatter: NoteFrontMatter;

  // the final, compiled JSX by next-mdx-remote; see lib/helpers/parse-notes.ts
  source: MDXRemoteSerializeResult;
};
