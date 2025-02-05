import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import Content from "../../../components/Content";
import PostMeta from "../../../components/PostMeta";
import Comments from "../../../components/Comments";
import { getPostSlugs, getPostData } from "../../../lib/helpers/posts";
import * as mdxComponents from "../../../lib/helpers/mdx-components";
import { metadata as defaultMetadata } from "../../layout";
import config from "../../../lib/config";
import type { Metadata } from "next";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#disable-rendering-for-unspecified-paths
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontMatter } = await getPostData(slug);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: frontMatter.title,
      url: `/notes/${slug}`,
      type: "article",
      authors: [config.authorName],
      tags: frontMatter.tags,
      publishedTime: frontMatter.date,
      modifiedTime: frontMatter.date,
      images: frontMatter.image
        ? [{ url: frontMatter.image, alt: frontMatter.title }]
        : defaultMetadata.openGraph?.images,
    },
    alternates: {
      ...defaultMetadata.alternates,
      canonical: `/notes/${slug}`,
    },

    // TODO: re-add JSON-LD manually, see https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontMatter, markdown } = await getPostData(slug);

  const { remarkGfm, remarkSmartypants, rehypeSlug, rehypeUnwrapImages, rehypePrism } = await import(
    "../../../lib/helpers/remark-rehype-plugins"
  );

  const { default: MDXContent } = await evaluate(markdown, {
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
      <PostMeta {...frontMatter} />

      <Content>
        <MDXContent
          // @ts-expect-error
          components={{ ...mdxComponents }}
        />
      </Content>

      {!frontMatter.noComments && (
        <div id="comments">
          <Comments title={frontMatter.title} />
        </div>
      )}
    </>
  );
}
