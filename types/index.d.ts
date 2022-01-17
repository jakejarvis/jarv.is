import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type NoteMetaType = {
  title: string;
  htmlTitle: string;
  date: string;
  slug: string;
  permalink: string;
  description?: string;
  image?: string;
  tags?: string[];
  readingMins?: number;
  noComments?: boolean;
};

export type NoteType = {
  frontMatter: NoteMetaType;
  source: MDXRemoteSerializeResult;
};

export type RepoType = {
  name: string;
  url: string;
  description?: string;
  language?: {
    name: string;
    color?: string;
  };
  stars?: number;
  forks?: number;
  updatedAt: string;
};
