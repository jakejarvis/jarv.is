import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { compiler } from "markdown-to-jsx";
import removeMarkdown from "remove-markdown";
import sanitizeHtml from "sanitize-html";
import readingTime from "reading-time";
import { NOTES_DIR, baseUrl } from "./config";

// remark/rehype markdown plugins
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// note: 'common' only exports these languages: https://github.com/wooorm/refractor/blob/main/lib/common.js
// eslint-disable-next-line import/no-unresolved
import rehypePrism from "rehype-prism-plus/common";

import type { NoteMetaType, NoteType } from "../types";

// returns all .mdx files in NOTES_DIR (without .mdx extension)
export const getNoteSlugs = () =>
  fs
    .readdirSync(path.join(process.cwd(), NOTES_DIR))
    .filter((file) => /\.mdx$/.test(file))
    .map((noteFile) => noteFile.replace(/\.mdx$/, ""));

// returns front matter and/or *raw* markdown contents of a given slug
export const getNoteData = (slug: string): { frontMatter: NoteMetaType; content: string } => {
  const fullPath = path.join(process.cwd(), NOTES_DIR, `${slug}.mdx`);
  const rawContent = fs.readFileSync(fullPath, "utf8");
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
      ...(data as Omit<NoteMetaType, "slug" | "title" | "htmlTitle" | "permalink" | "date" | "readingMins">),
      // zero markdown title:
      title: removeMarkdown(data.title),
      // parsed markdown title:
      htmlTitle,
      slug,
      permalink: `${baseUrl}/notes/${slug}/`,
      date: new Date(data.date).toISOString(), // validate/normalize the date string provided from front matter
      readingMins: Math.ceil(readingTime(content).minutes),
    },
    content,
  };
};

export const getNote = async (slug: string): Promise<NoteType> => {
  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  process.env.ESBUILD_BINARY_PATH =
    process.platform === "win32"
      ? path.join(process.cwd(), "node_modules", "esbuild", "esbuild.exe")
      : path.join(process.cwd(), "node_modules", "esbuild", "bin", "esbuild");

  const { frontMatter, content } = getNoteData(slug);
  const { code: mdxSource } = await bundleMDX({
    source: content,
    cwd: process.cwd(),
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), [remarkGfm, { singleTilde: false }]];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [rehypeSlug, {}],
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: { className: "h-anchor", ariaHidden: true, tabIndex: -1 },
            content: [],
            test: ["h2", "h3"],
          },
        ],
        [rehypePrism, { ignoreMissing: true }],
      ];

      return options;
    },
    esbuildOptions: (options) => {
      options.minify = true;
      options.target = ["es2018"];
      options.loader = {
        ...options.loader,
        ".js": "jsx",
        ".ts": "tsx",
      };

      return options;
    },
  });

  return {
    frontMatter,
    mdxSource,
  };
};

// returns the front matter of ALL notes, sorted reverse chronologically
export const getAllNotes = () =>
  getNoteSlugs()
    .map((slug) => getNoteData(slug).frontMatter)
    .sort((note1: NoteMetaType, note2: NoteMetaType) => (note1.date > note2.date ? -1 : 1));
