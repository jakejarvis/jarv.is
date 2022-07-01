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
  noComments?: boolean;
};

export type NoteWithSource = {
  // yaml metadata
  frontMatter: NoteFrontMatter;

  // the final, compiled JSX by next-mdx-remote; see lib/helpers/parse-notes.ts
  source: MDXRemoteSerializeResult<Record<string, never>>;
};

export type NotesByYear = {
  [year: string]: NoteFrontMatter[];
};
