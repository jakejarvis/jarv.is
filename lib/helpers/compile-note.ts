import { serialize } from "next-mdx-remote/serialize";
import { getNoteData } from "./parse-notes";

import type { NoteWithSource } from "../../types";

// fully parses MDX into JS and returns *everything* about a note
export const compileNote = async (slug: string): Promise<NoteWithSource> => {
  const { frontMatter, content } = await getNoteData(slug);

  const { remarkGfm, remarkSmartypants, remarkUnwrapImages, rehypeSlug, rehypePrism } = await import(
    "./remark-rehype-plugins"
  );

  const { compiledSource } = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [
        // @ts-ignore
        [remarkGfm, { singleTilde: false }],
        [
          // @ts-ignore
          remarkSmartypants,
          {
            quotes: true,
            dashes: "oldschool",
            backticks: false,
            ellipses: false,
          },
        ],
        // @ts-ignore
        [remarkUnwrapImages],
      ],
      rehypePlugins: [
        // @ts-ignore
        [rehypeSlug],
        // @ts-ignore
        [rehypePrism, { ignoreMissing: true }],
      ],
    },
  });

  return {
    frontMatter,
    source: {
      compiledSource,
    },
  };
};
