import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { escape } from "html-escaper";
import Content from "../../components/Content";
import Meta from "../../components/notes/Meta";
import Comments from "../../components/notes/Comments";
import mdxComponents from "../../components/mdxComponents";
import { getNoteData, getNoteSlugs } from "../../lib/parse-notes";
import * as config from "../../lib/config";
import type { GetStaticProps, GetStaticPaths } from "next";

// mdx plugins
import rehypeHighlight from "rehype-highlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const Note = ({ frontMatter, source }) => (
  <>
    <NextSeo
      title={frontMatter.title}
      description={frontMatter.description}
      canonical={frontMatter.permalink}
      openGraph={{
        title: frontMatter.title,
        url: frontMatter.permalink,
        type: "article",
        article: {
          authors: [config.authorName],
          tags: frontMatter.tags,
          publishedTime: frontMatter.date,
          modifiedTime: frontMatter.date,
        },
        images: frontMatter.image && [
          {
            url: `${config.baseUrl}${frontMatter.image}`,
            alt: frontMatter.title,
          },
        ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
    <ArticleJsonLd
      url={frontMatter.permalink}
      title={escape(frontMatter.title)}
      description={escape(frontMatter.description)}
      datePublished={frontMatter.date}
      dateModified={frontMatter.date}
      images={frontMatter.image && [`${config.baseUrl}${frontMatter.image}`]}
      authorName={[config.authorName]}
      publisherName={config.siteName}
      publisherLogo={`${config.baseUrl}/static/images/me.jpg`}
    />

    <Meta {...frontMatter} />
    <Content>
      <MDXRemote {...source} components={mdxComponents} />
    </Content>
    <Comments slug={frontMatter.slug} />
  </>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { frontMatter, content } = getNoteData(params.slug as string);

  const source = await serialize(content, {
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
      frontMatter,
      source,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getNoteSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Note;
