import fs from "fs/promises";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import urlJoin from "url-join";
import { minify } from "uglify-js";
import { compiler } from "markdown-to-jsx";
import removeMarkdown from "remove-markdown";
import sanitizeHtml from "sanitize-html";
import readingTime from "reading-time";
import { formatDateISO } from "./format-date";
import { baseUrl } from "../config";
import { NOTES_DIR } from "../config/constants";

// remark/rehype markdown plugins
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";

import type { NoteType } from "../../types";

// returns all .mdx files in NOTES_DIR (without .mdx extension)
export const getNoteSlugs = async () => {
  // get all files in NOTES_DIR
  const files = await fs.readdir(path.join(process.cwd(), NOTES_DIR));

  // narrow to only the .mdx files and strip the .mdx extension
  return files.filter((file) => /\.mdx$/.test(file)).map((noteFile) => noteFile.replace(/\.mdx$/, ""));
};

// returns front matter and/or *raw* markdown contents of a given slug
export const getNoteData = async (slug: string): Promise<Omit<NoteType, "source"> & { content: string }> => {
  const fullPath = path.join(process.cwd(), NOTES_DIR, `${slug}.mdx`);
  const rawContent = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(rawContent);

  // carefully allow VERY limited markdown in post titles...
  const htmlTitle = sanitizeHtml(
    renderToStaticMarkup(
      compiler(data.title, {
        forceInline: true,
        disableParsingRawHTML: true,
      })
    ),
    {
      allowedTags: ["code", "pre", "em", "strong", "del"],
    }
  );

  // return both the parsed YAML front matter (with a few amendments) and the raw, unparsed markdown content
  return {
    frontMatter: {
      ...(data as Omit<NoteType["frontMatter"], "slug" | "title" | "htmlTitle" | "permalink" | "date" | "readingMins">),
      // zero markdown title:
      title: removeMarkdown(data.title),
      // parsed markdown title:
      htmlTitle,
      slug,
      permalink: urlJoin(baseUrl, "notes", slug, "/"),
      date: formatDateISO(data.date), // validate/normalize the date string provided from front matter
      readingMins: Math.ceil(readingTime(content).minutes),
    },
    content,
  };
};

// fully parses MDX into JS and returns *everything* about a note
export const getNote = async (slug: string): Promise<NoteType> => {
  const { frontMatter, content } = await getNoteData(slug);
  const source = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [[remarkGfm, { singleTilde: false }]],
      rehypePlugins: [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]],
    },
  });

  // HACK: next-mdx-remote v4 doesn't (yet?) minify compiled JSX output, see:
  // https://github.com/hashicorp/next-mdx-remote/pull/211#issuecomment-1013658514
  // ...so for now, let's do it manually (and conservatively) with uglify-js when building for production.
  const compiledSource =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? minify(source.compiledSource, {
          toplevel: true,
          parse: {
            bare_returns: true,
          },
        }).code
      : source.compiledSource;

  return {
    frontMatter,
    source: {
      compiledSource,
    },
  };
};

// returns the front matter of ALL notes, sorted reverse chronologically
export const getAllNotes = async () => {
  const slugs = await getNoteSlugs();

  // for each slug, query its front matter
  // https://stackoverflow.com/a/40140562/1438024
  const data = await Promise.all(slugs.map(async (slug) => (await getNoteData(slug)).frontMatter));

  // sort the results by date
  return data.sort((note1: NoteType["frontMatter"], note2: NoteType["frontMatter"]) =>
    note1.date > note2.date ? -1 : 1
  );
};
