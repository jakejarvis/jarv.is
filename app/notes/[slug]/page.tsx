import { env } from "@/lib/env";
import { Suspense } from "react";
import { JsonLd } from "react-schemaorg";
import { CalendarDaysIcon, TagIcon, SquarePenIcon, EyeIcon } from "lucide-react";
import Link from "@/components/link";
import Time from "@/components/time";
import Comments from "@/components/comments";
import Loading from "@/components/loading";
import ViewCounter from "@/components/view-counter";
import { getSlugs, getFrontMatter } from "@/lib/posts";
import { createMetadata } from "@/lib/metadata";
import siteConfig from "@/lib/config/site";
import authorConfig from "@/lib/config/author";
import { POSTS_DIR } from "@/lib/config/constants";
import { size as ogImageSize } from "./opengraph-image";
import type { Metadata } from "next";
import type { BlogPosting } from "schema-dts";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#disable-rendering-for-unspecified-paths
export const dynamicParams = false;

// https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering#using-partial-prerendering
export const experimental_ppr = true;

export const generateStaticParams = async () => {
  const slugs = await getSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  return createMetadata({
    title: frontmatter!.title,
    description: frontmatter!.description,
    canonical: `/${POSTS_DIR}/${slug}`,
    openGraph: {
      type: "article",
      authors: [authorConfig.name],
      tags: frontmatter!.tags,
      publishedTime: frontmatter!.date,
      modifiedTime: frontmatter!.date,
    },
    twitter: {
      card: "summary_large_image",
    },
  });
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = await getFrontMatter(slug);

  const { default: MDXContent } = await import(`../../../${POSTS_DIR}/${slug}/index.mdx`);

  return (
    <>
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: frontmatter!.title,
          description: frontmatter!.description,
          url: frontmatter!.permalink,
          image: {
            "@type": "ImageObject",
            contentUrl: `${env.NEXT_PUBLIC_BASE_URL}/${POSTS_DIR}/${frontmatter!.slug}/opengraph-image`,
            width: `${ogImageSize.width}`,
            height: `${ogImageSize.height}`,
          },
          keywords: frontmatter!.tags?.join(", "),
          datePublished: frontmatter!.date,
          dateModified: frontmatter!.date,
          inLanguage: env.NEXT_PUBLIC_SITE_LOCALE,
          license: `https://spdx.org/licenses/${siteConfig.license}.html`,
          author: {
            // defined in app/layout.tsx
            "@id": `${env.NEXT_PUBLIC_BASE_URL}/#person`,
          },
        }}
      />

      <div className="text-foreground/70 -mt-1 flex flex-wrap justify-items-start space-x-4 text-[0.8rem] leading-9 tracking-wide md:text-[0.85rem]">
        <Link
          href={`/${POSTS_DIR}/${frontmatter!.slug}`}
          className={"text-foreground/70 flex items-center space-x-2 whitespace-nowrap hover:no-underline"}
        >
          <CalendarDaysIcon className="inline size-4 shrink-0" />
          <Time date={frontmatter!.date} format="MMMM d, y" />
        </Link>

        {frontmatter!.tags && (
          <div className="flex flex-wrap items-center space-x-2 whitespace-nowrap">
            <TagIcon className="inline size-4 shrink-0" />
            {frontmatter!.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="before:text-foreground/40 lowercase before:pr-0.5 before:content-['\0023'] last-of-type:mr-0"
                aria-label={`Tagged with ${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}/blob/main/${POSTS_DIR}/${frontmatter!.slug}/index.mdx`}
          title={`Edit "${frontmatter!.title}" on GitHub`}
          className={"text-foreground/70 flex items-center space-x-2 whitespace-nowrap hover:no-underline"}
        >
          <SquarePenIcon className="inline size-4 shrink-0" />
          <span>Improve This Post</span>
        </Link>

        <div className="flex min-w-14 items-center space-x-2 whitespace-nowrap">
          <EyeIcon className="inline size-4 shrink-0" />
          <Suspense
            // when this loads, the component will count up from zero to the actual number of hits, so we can simply
            // show a zero here as a "loading indicator"
            fallback={<span>0</span>}
          >
            <ViewCounter slug={`${POSTS_DIR}/${frontmatter!.slug}`} />
          </Suspense>
        </div>
      </div>

      <h1 className="mt-2 mb-3 text-3xl/10 font-bold md:text-4xl/12">
        <Link
          href={`/${POSTS_DIR}/${frontmatter!.slug}`}
          dangerouslySetInnerHTML={{ __html: frontmatter!.htmlTitle || frontmatter!.title }}
          className="text-foreground hover:no-underline"
        />
      </h1>

      <MDXContent />

      {!frontmatter!.noComments && (
        <div id="comments" className="border-ring mt-8 min-h-36 border-t-2 pt-8">
          <Suspense fallback={<Loading boxes={3} width={40} className="mx-auto my-8 block" />}>
            <Comments title={frontmatter!.title} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Page;
