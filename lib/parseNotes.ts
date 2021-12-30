import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const NOTES_PATH = path.join(process.cwd(), "notes");

export function getNoteSlugs() {
  return fs.readdirSync(NOTES_PATH);
}

// Return all md(x) files in NOTES_PATH
export const notePaths = getNoteSlugs().filter((path) => /\.mdx?$/.test(path));

export function getNoteBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(NOTES_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllNotes(fields = []) {
  const slugs = getNoteSlugs();
  const notes = slugs
    .map((slug) => getNoteBySlug(slug, fields))
    // sort notes by date in descending order
    .sort((note1: any, note2: any) => (note1.date > note2.date ? -1 : 1));
  return notes;
}
