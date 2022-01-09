import { useMemo } from "react";
import dynamic from "next/dynamic";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { escape } from "html-escaper";
import { getMDXComponent } from "mdx-bundler/client";
import Content from "../../components/Content";
import Meta from "../../components/notes/Meta";
import mdxComponents from "../../components/mdxComponents";
import { getNote, getNoteSlugs } from "../../lib/parse-notes";
import * as config from "../../lib/config";
import type { GetStaticProps, GetStaticPaths } from "next";

const Comments = dynamic(() => import("../../components/notes/Comments"), { ssr: false });

const Note = ({ frontMatter, mdxSource }) => {
  const MDXComponent = useMemo(() => getMDXComponent(mdxSource, { process }), [mdxSource]);

  return (
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
        {/* @ts-ignore */}
        <MDXComponent components={mdxComponents} />
      </Content>
      <Comments slug={frontMatter.slug} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { frontMatter, mdxSource } = await getNote(params.slug as string);

  return {
    props: {
      frontMatter,
      mdxSource,
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
