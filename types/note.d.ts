import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type NoteType = {
  frontMatter: {
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

  // the final, compiled JSX by next-mdx-remote; see lib/parse-notes.ts
  source: MDXRemoteSerializeResult;
};
