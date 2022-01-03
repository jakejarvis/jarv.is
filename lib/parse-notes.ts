import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format, parseISO } from "date-fns";
import { NOTES_DIR } from "./config";

export const getNoteData = (file: string) => {
  const slug = file.replace(/\.mdx$/, "");
  const fullPath = path.join(process.cwd(), NOTES_DIR, `${slug}.mdx`);
  const contents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(contents);

  return {
    ...data,
    slug,
    date: parseISO(data.date).toISOString(), // validate/normalize the date string provided from front matter
    year: parseInt(format(parseISO(data.date), "yyyy")), // parse years here so it's easier to group them on list page
  };
};

// all .mdx files in NOTES_DIR
export const getNoteFiles = () =>
  fs.readdirSync(path.join(process.cwd(), NOTES_DIR)).filter((notePath) => /\.mdx$/.test(notePath));

export const getAllNotes = () =>
  getNoteFiles()
    .map((file) => getNoteData(file))
    // sort notes by date in descending order
    .sort((note1: any, note2: any) => (note1.date > note2.date ? -1 : 1));
