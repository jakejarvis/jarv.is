export type NoteMetaType = {
  title: string;
  htmlTitle?: string;
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
  mdxSource: string;
};
