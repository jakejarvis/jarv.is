import { InView } from "react-intersection-observer";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { MDXRemote } from "next-mdx-remote";
import Content from "../../components/Content";
import NoteMeta from "../../components/NoteMeta";
import Comments from "../../components/Comments";
import * as mdxComponents from "../../lib/helpers/mdx-components";
import { getNoteSlugs } from "../../lib/helpers/parse-notes";
import { compileNote } from "../../lib/helpers/compile-note";
import * as config from "../../lib/config";
import { articleJsonLd, favicons } from "../../lib/config/seo";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { NoteWithSource, NoteFrontMatter } from "../../types";

const Note = ({ frontMatter, source }: NoteWithSource) => {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description || config.longDescription}
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
          images: [
            {
              url: `${config.baseUrl}${frontMatter.image || favicons.meJpg.src}`,
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
        title={frontMatter.title}
        description={frontMatter.description || config.longDescription}
        datePublished={frontMatter.date}
        dateModified={frontMatter.date}
        images={[`${config.baseUrl}${frontMatter.image || favicons.meJpg.src}`]}
        {...articleJsonLd}
      />

      <NoteMeta {...frontMatter} />

      <Content>
        <MDXRemote
          {...source}
          // @ts-ignore
          components={{ ...mdxComponents }}
        />
      </Content>

      {!frontMatter.noComments && (
        <InView rootMargin="140px" triggerOnce fallbackInView>
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
  const { frontMatter, source } = await compileNote((params as Pick<NoteFrontMatter, "slug">).slug);

  return {
    props: {
      frontMatter,
      source,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getNoteSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Note;
