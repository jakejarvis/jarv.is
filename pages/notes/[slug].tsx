import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { escape } from "html-escaper";
import { getMDXComponent } from "mdx-bundler/client";
import Content from "../../components/Content";
import Meta from "../../components/notes/Meta";
import Loading from "../../components/loading/Loading";
import CustomCode from "../../components/code-block/Code";
import { getNote, getNoteSlugs } from "../../lib/parse-notes";
import * as config from "../../lib/config";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { NoteType } from "../../types";

const Note = ({ frontMatter, mdxSource }: NoteType) => {
  const MDXComponent = useMemo(() => getMDXComponent(mdxSource, { process }), [mdxSource]);
  const [commentsRef, commentsInView] = useInView({
    rootMargin: "100px", // start loading comments script 100px from end of content
    triggerOnce: true, // don't unload one it's loaded (if user scrolls back up)
    fallbackInView: true,
  });
  const Comments = dynamic(() => import("../../components/notes/Comments"), {
    ssr: false,
    loading: () => (
      <div style={{ display: "block", margin: "5em auto 3.5em auto", textAlign: "center" }}>
        <Loading boxes={3} width={50} />
      </div>
    ),
  });

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
        <MDXComponent components={{ code: CustomCode }} />
      </Content>
      {frontMatter.noComments !== true && (
        <div ref={commentsRef}>{commentsInView && <Comments title={frontMatter.title} />}</div>
      )}
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
