import { IconCalendarEvent, IconEdit, IconEye, IconMessages, IconTag } from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { BlogPosting } from "schema-dts";

import { CommentCount } from "@/components/comment-count";
import { Comments } from "@/components/comments/comments";
import { ViewCounter } from "@/components/view-counter";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { getNote } from "@/lib/functions/content";
import { createHead, jsonLd } from "@/lib/metadata";
import { getPost, POSTS_DIR } from "@/lib/posts";

/** Dimensions of the generated OG image (see ./$slug_.opengraph-image[.]png.tsx). */
const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const Route = createFileRoute("/notes/$slug")({
  loader: async ({ params: { slug } }) => {
    // metadata is bundled with the client, so it's only the body that's fetched from the server
    const post = getPost(slug);
    if (!post) throw notFound();

    const { Body } = await getNote({ data: slug });
    return { post, Body };
  },
  // content only changes on deploy
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const ogImage = `/${POSTS_DIR}/${post.slug}/opengraph-image.png`;

    return createHead({
      title: post.title,
      description: post.description,
      canonical: `/${POSTS_DIR}/${post.slug}`,
      image: { url: ogImage, ...OG_IMAGE_SIZE, type: "image/png" },
      openGraph: {
        type: "article",
        author: authorConfig.name,
        publishedTime: post.date,
        modifiedTime: post.date,
      },
      twitterCard: "summary_large_image",
      jsonLd: [
        jsonLd<BlogPosting>({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: post.permalink,
          image: {
            "@type": "ImageObject",
            contentUrl: `${import.meta.env.VITE_BASE_URL}${ogImage}`,
            width: `${OG_IMAGE_SIZE.width}`,
            height: `${OG_IMAGE_SIZE.height}`,
          },
          keywords: post.tags?.join(", "),
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: import.meta.env.VITE_SITE_LOCALE,
          license: `https://spdx.org/licenses/${siteConfig.license}.html`,
          author: {
            // defined in src/routes/__root.tsx
            "@id": `${import.meta.env.VITE_BASE_URL}/#person`,
          },
        }),
      ],
    });
  },
  component: Page,
});

function Page() {
  const { post, Body } = Route.useLoaderData();

  const d = new Date(post.date);
  const formattedDates = {
    dateISO: d.toISOString(),
    dateTitle: d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    dateDisplay: d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };

  return (
    <>
      {/* repeated tags can't go through head() (it keeps one meta per property); React hoists these into <head> */}
      {post.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[13px] tracking-wide text-foreground/70">
        <Link
          to="/notes/$slug"
          params={{ slug: post.slug }}
          className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-inherit hover:no-underline"
        >
          <IconCalendarEvent className="inline size-3.5 shrink-0" aria-hidden="true" />
          <time
            dateTime={formattedDates.dateISO}
            title={formattedDates.dateTitle}
            suppressHydrationWarning
          >
            {formattedDates.dateDisplay}
          </time>
        </Link>

        {post.tags && (
          <div className="flex flex-wrap items-center gap-1.5">
            <IconTag className="inline size-3.5 shrink-0" aria-hidden="true" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="mx-px lowercase before:pr-0.5 before:text-foreground/40 before:content-['#'] first-of-type:ml-0 last-of-type:mr-0"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={`https://github.com/${import.meta.env.VITE_GITHUB_REPO}/blob/main/${POSTS_DIR}/${post.slug}/index.mdx`}
          title={`Edit "${post.title}" on GitHub`}
          className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-inherit hover:no-underline"
        >
          <IconEdit className="inline size-3.5 shrink-0" aria-hidden="true" />
          <span>Improve This Post</span>
        </a>

        <Link
          to="/notes/$slug"
          params={{ slug: post.slug }}
          hash="comments"
          className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-inherit hover:no-underline"
        >
          <IconMessages className="inline size-3.5 shrink-0" aria-hidden="true" />
          <CommentCount slug={`${POSTS_DIR}/${post.slug}`} />
        </Link>

        <div className="flex min-w-14 flex-nowrap items-center gap-1.5 whitespace-nowrap">
          <IconEye className="inline size-3.5 shrink-0" aria-hidden="true" />
          <ViewCounter slug={`${POSTS_DIR}/${post.slug}`} />
        </div>
      </div>

      <h1 className="my-5 text-2xl font-medium tracking-tight">
        <Link
          to="/notes/$slug"
          params={{ slug: post.slug }}
          dangerouslySetInnerHTML={{
            __html: post.htmlTitle || post.title,
          }}
          className="text-foreground hover:no-underline"
        />
      </h1>

      <article className="markdown">{Body}</article>

      <section id="comments" className="isolate my-8 w-full border-t-2 pt-8">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {post.noComments ? (
            <div className="flex justify-center rounded-lg bg-muted/40 px-6 py-12">
              <p className="text-center text-lg font-medium">Comments are closed.</p>
            </div>
          ) : (
            <Comments slug={`${POSTS_DIR}/${post.slug}`} />
          )}
        </div>
      </section>
    </>
  );
}
