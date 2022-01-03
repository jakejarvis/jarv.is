import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseISO } from "date-fns";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo, ArticleJsonLd } from "next-seo";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Meta from "../../components/notes/Meta";
import mdxComponents from "../../components/mdxComponents";
import { getNoteFiles } from "../../lib/parse-notes";
import * as config from "../../lib/config";
import type { GetStaticProps, GetStaticPaths } from "next";

// mdx plugins
import rehypeHighlight from "rehype-highlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const Note = ({ source, frontMatter, slug }) => (
  <>
    <NextSeo
      title={frontMatter.title}
      description={frontMatter.description}
      canonical={`${config.baseUrl}/notes/${slug}/`}
      openGraph={{
        title: frontMatter.title,
        url: `${config.baseUrl}/notes/${slug}/`,
        type: "article",
        article: {
          publishedTime: frontMatter.date,
        },
        images: frontMatter.image && [
          {
            url: `${config.baseUrl}${frontMatter.image}`,
            alt: frontMatter.title,
          },
        ],
      }}
      twitter={{
        handle: `@${config.authorSocial.twitter}`,
        site: `@${config.authorSocial.twitter}`,
        cardType: "summary_large_image",
      }}
    />
    <ArticleJsonLd
      url={`${config.baseUrl}/notes/${slug}/`}
      title={frontMatter.title}
      description={frontMatter.description}
      datePublished={frontMatter.date}
      dateModified={frontMatter.date}
      images={frontMatter.image && [`${config.baseUrl}${frontMatter.image}`]}
      authorName={[config.authorName]}
      publisherName={config.siteName}
      publisherLogo={`${config.baseUrl}/static/images/me.jpg`}
    />

    <Layout>
      <Container>
        <Meta {...frontMatter} slug={slug} />
        <Content>
          <div className="markdown">
            <MDXRemote {...source} components={mdxComponents} />
          </div>
        </Content>
      </Container>
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), config.NOTES_DIR, `${params.slug}.mdx`);
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
      frontMatter: {
        ...data,
        date: parseISO(data.date).toISOString(), // validate/normalize the date string provided from front matter
      },
      source: mdxSource,
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getNoteFiles()
    // Remove file extensions for page paths
    .map((notePath) => notePath.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Note;
