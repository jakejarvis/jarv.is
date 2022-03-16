import { InView } from "react-intersection-observer";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { MDXRemote } from "next-mdx-remote";
import { htmlEscape } from "escape-goat";
import Content from "../../components/Content";
import NoteMeta from "../../components/NoteMeta";
import Comments from "../../components/Comments";
import * as mdxComponents from "../../lib/helpers/mdx-components";
import { getNote, getNoteSlugs } from "../../lib/helpers/parse-notes";
import * as config from "../../lib/config";
import { articleJsonLd } from "../../lib/config/seo";
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
        title={htmlEscape(frontMatter.title)}
        description={htmlEscape(frontMatter.description)}
        datePublished={frontMatter.date}
        dateModified={frontMatter.date}
        images={frontMatter.image && [`${config.baseUrl}${frontMatter.image}`]}
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

      {/* comments can be disabled for an individual post via `noComments: true` in its front matter */}
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

export const getStaticProps: GetStaticProps = async ({ params }: { params: Pick<NoteType["frontMatter"], "slug"> }) => {
  const { frontMatter, source } = await getNote(params.slug);

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
