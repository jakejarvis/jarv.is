import { InView } from "react-intersection-observer";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import Content from "../../components/Content";
import NoteMeta from "../../components/NoteMeta";
import Comments from "../../components/Comments";
import * as mdxComponents from "../../lib/helpers/mdx-components";
import { getNoteSlugs } from "../../lib/helpers/parse-notes";
import { compileNote } from "../../lib/helpers/compile-note";
import * as config from "../../lib/config";
import { articleJsonLd } from "../../lib/config/seo";
import { meJpg } from "../../lib/config/favicons";
import type { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import type { NoteWithSource, NoteFrontMatter } from "../../types";

const Note = ({ frontMatter, source }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
              url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}${frontMatter.image || meJpg.src}`,
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
        images={[`${process.env.NEXT_PUBLIC_BASE_URL || ""}${frontMatter.image || meJpg.src}`]}
        {...articleJsonLd}
      />

      <NoteMeta {...frontMatter} />

      <Content>
        <MDXRemote {...source} components={{ ...(mdxComponents as MDXRemoteProps["components"]) }} />
      </Content>

      {!frontMatter.noComments && (
        <InView rootMargin="140px" triggerOnce fallbackInView>
          {({ inView, ref }) => (
            <div ref={ref} id="comments">
              {inView && <Comments title={frontMatter.title} />}
            </div>
          )}
        </InView>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<NoteWithSource, Pick<NoteFrontMatter, "slug">> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const { frontMatter, source } = await compileNote(params.slug);

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
