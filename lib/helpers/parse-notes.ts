import fs from "fs/promises";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import { marked } from "marked";
import removeMarkdown from "remove-markdown";
import pMap from "p-map";
import { formatDate } from "./format-date";
import { baseUrl } from "../config";
import { NOTES_DIR } from "../config/constants";

import type { NoteFrontMatter } from "../../types";

export const getNoteSlugs = async (): Promise<string[]> => {
  // list all .mdx files in NOTES_DIR
  const mdxFiles = await glob("*.mdx", { cwd: NOTES_DIR });

  // strip the .mdx extensions from filenames
  const slugs = mdxFiles.map((fileName) => fileName.replace(/\.mdx$/, ""));

  return slugs;
};

// returns front matter and/or *raw* markdown contents of a given slug
export const getNoteData = async (
  slug: string
): Promise<{
  frontMatter: NoteFrontMatter;
  content: string;
}> => {
  const fullPath = path.join(NOTES_DIR, `${slug}.mdx`);
  const rawContent = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(rawContent);

  // return both the parsed YAML front matter (with a few amendments) and the raw, unparsed markdown content
  return {
    frontMatter: {
      ...(data as Partial<NoteFrontMatter>),
      // zero markdown title:
      title: removeMarkdown(data.title),
      // allow markdown formatting to appear in post titles in some places (rarely used):
      htmlTitle: marked.parseInline(data.title, {
        silent: true,
        smartypants: true,
      }),
      slug,
      permalink: `${baseUrl}/notes/${slug}/`,
      date: formatDate(data.date), // validate/normalize the date string provided from front matter
    },
    content,
  };
};

// returns the front matter of ALL notes, sorted reverse chronologically
export const getAllNotes = async (): Promise<NoteFrontMatter[]> => {
  const slugs = await getNoteSlugs();

  // for each slug, query its front matter
  const data = await pMap(slugs, async (slug) => (await getNoteData(slug)).frontMatter, {
    stopOnError: true,
  });

  // sort the results by date
  data.sort((note1, note2) => (note1.date > note2.date ? -1 : 1));

  return data;
};
