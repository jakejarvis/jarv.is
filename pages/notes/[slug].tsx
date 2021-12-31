import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo, ArticleJsonLd } from "next-seo";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Meta from "../../components/notes/Meta";
import { notePaths, NOTES_PATH } from "../../lib/parse-notes";
import mdxComponents from "../../components/mdxComponents";
import * as config from "../../lib/config";
import type { GetStaticProps, GetStaticPaths } from "next";

// mdx plugins
import rehypeHighlight from "rehype-highlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default function Page({ source, frontMatter, slug }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          title: frontMatter.title,
          type: "article",
          article: {
            publishedTime: frontMatter.date,
          },
          images: [
            {
              url: `${config.baseURL}${frontMatter.image}`,
              alt: frontMatter.title,
            },
          ],
        }}
        twitter={{
          handle: `@${config.twitterHandle}`,
          site: `@${config.twitterHandle}`,
          cardType: "summary_large_image",
        }}
      />
      <ArticleJsonLd
        url={`${config.baseURL}/notes/${slug}`}
        title={frontMatter.title}
        description={frontMatter.description}
        datePublished={frontMatter.date}
        dateModified={frontMatter.date}
        images={[`${config.baseURL}${frontMatter.image}`]}
        authorName={[config.authorName]}
        publisherName={config.siteName}
        publisherLogo={`${config.baseURL}/static/images/me.jpg`}
      />

      <Layout>
        <Container>
          <Meta {...frontMatter} slug={slug} />
          <Content>
            <MDXRemote {...source} components={mdxComponents} />
          </Content>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(NOTES_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      // remarkPlugins: [],
      rehypePlugins: [
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [rehypeSlug, {}],
        [
          rehypeAutolinkHeadings,
          { behavior: "append", properties: { className: "h-anchor" }, content: [], test: ["h2", "h3"] },
        ],
        [rehypeHighlight, {}],
      ],
    },
  });

  return {
    props: {
      frontMatter: data,
      source: mdxSource,
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = notePaths
    // Remove file extensions for page paths
    .map((notePath) => notePath.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
