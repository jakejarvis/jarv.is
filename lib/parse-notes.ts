import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import { NOTES_DIR, baseUrl } from "./config";

// remark/rehype markdown plugins
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

// returns all .mdx files in NOTES_DIR (without .mdx extension)
export const getNoteSlugs = () =>
  fs
    .readdirSync(path.join(process.cwd(), NOTES_DIR))
    .filter((file) => /\.mdx$/.test(file))
    .map((noteFile) => noteFile.replace(/\.mdx$/, ""));

// returns front matter and/or *raw* markdown contents of a given slug
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
      readingTime: readingTime(content).minutes,
    },
    content,
  };
};

export const getNote = async (slug: string) => {
  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), "node_modules", "esbuild", "esbuild.exe");
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), "node_modules", "esbuild", "bin", "esbuild");
  }

  const { frontMatter, content } = getNoteData(slug);
  const { code: mdxSource } = await bundleMDX({
    source: content,
    cwd: process.cwd(),
    // cwd: path.join("/Users/jake/source/jarv.is", "components"),
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), [remarkGfm, { singleTilde: false }]];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [rehypeSlug, {}],
        [
          rehypeAutolinkHeadings,
          { behavior: "append", properties: { className: "h-anchor" }, content: [], test: ["h2", "h3"] },
        ],
        [rehypeHighlight, {}],
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
    .sort((note1: any, note2: any) => (note1.date > note2.date ? -1 : 1));
