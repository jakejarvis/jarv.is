import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NOTES_DIR, baseUrl } from "./config";

export const getNoteData = (slug: string) => {
  const fullPath = path.join(process.cwd(), NOTES_DIR, `${slug}.mdx`);
  const rawContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(rawContent);

  return {
    frontMatter: {
      ...data,
      slug,
      permalink: `${baseUrl}/notes/${slug}/`,
      date: new Date(data.date).toISOString(), // validate/normalize the date string provided from front matter
    },
    content,
  };
};

// all .mdx files in NOTES_DIR
export const getNoteSlugs = () =>
  fs
    .readdirSync(path.join(process.cwd(), NOTES_DIR))
    .filter((file) => /\.mdx$/.test(file))
    .map((noteFile) => noteFile.replace(/\.mdx$/, ""));

export const getAllNotes = () =>
  getNoteSlugs()
    .map((slug) => getNoteData(slug).frontMatter)
    // sort notes by date in descending order
    .sort((note1: any, note2: any) => (note1.date > note2.date ? -1 : 1));
