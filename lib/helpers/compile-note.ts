import { serialize } from "next-mdx-remote/serialize";
import { minify } from "uglify-js";
import { getNoteData } from "./parse-notes";

import type { NoteWithSource } from "../../types";

// fully parses MDX into JS and returns *everything* about a note
export const compileNote = async (slug: string): Promise<NoteWithSource> => {
  const { frontMatter, content } = await getNoteData(slug);

  const { remarkGfm, remarkSmartypants, remarkUnwrapImages, rehypeSlug, rehypePrism } = await import(
    "./remark-rehype-plugins"
  );

  const source = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [
        [remarkGfm, { singleTilde: false }],
        [
          remarkSmartypants,
          {
            quotes: true,
            dashes: "oldschool",
            backticks: false,
            ellipses: false,
          },
        ],
        [remarkUnwrapImages],
      ],
      rehypePlugins: [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]],
    },
  });

  // TODO: next-mdx-remote v4 doesn't (yet?) minify compiled JSX output, see:
  // https://github.com/hashicorp/next-mdx-remote/pull/211#issuecomment-1013658514
  // ...so for now, let's do it manually (and conservatively) with uglify-js when building for production.
  const compiledSource =
    process.env.NODE_ENV === "production"
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
