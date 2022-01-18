import { InView } from "react-intersection-observer";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { MDXRemote } from "next-mdx-remote";
import { escape } from "html-escaper";
import Content from "../../components/Content/Content";
import Meta from "../../components/NoteMeta/NoteMeta";
import Comments from "../../components/Comments/Comments";
import * as mdxComponents from "../../lib/mdx-components";
import { getNote, getNoteSlugs } from "../../lib/parse-notes";
import * as config from "../../lib/config";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { NoteType } from "../../types";

const Note = ({ frontMatter, source }: NoteType) => {
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
        <MDXRemote {...source} components={{ ...mdxComponents }} lazy />
      </Content>
      {frontMatter.noComments !== true && (
        <InView rootMargin="140px" triggerOnce={true} fallbackInView={true}>
          {({ inView, ref }) => (
            <div id="comments" ref={ref}>
              {inView && <Comments title={frontMatter.title} />}
            </div>
          )}
        </InView>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { frontMatter, source } = await getNote(params.slug as string);

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
