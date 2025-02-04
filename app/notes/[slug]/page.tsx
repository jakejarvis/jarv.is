import path from "path";
import fs from "fs/promises";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import matter from "gray-matter";
import Content from "../../../components/Content";
import PostMeta from "../../../components/PostMeta";
import Comments from "../../../components/Comments";
import { getPostSlugs } from "../../../lib/helpers/posts";
import * as mdxComponents from "../../../lib/helpers/mdx-components";
import type { PostFrontMatter } from "../../../types";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const fullPath = path.join(process.cwd(), "notes", `${(await params).slug}.mdx`);
  const rawContent = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(rawContent);

  const { remarkGfm, remarkSmartypants, rehypeSlug, rehypeUnwrapImages, rehypePrism } = await import(
    "../../../lib/helpers/remark-rehype-plugins"
  );

  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
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
    ],
    rehypePlugins: [rehypeSlug, rehypeUnwrapImages, [rehypePrism, { ignoreMissing: true }]],
  });

  return (
    <>
      <PostMeta {...(data as PostFrontMatter)} />

      <Content>
        <MDXContent
          // @ts-expect-error
          components={{ ...mdxComponents }}
        />
      </Content>

      <div id="comments">
        <Comments title={data.title} />
      </div>
    </>
  );
}
