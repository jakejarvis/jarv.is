import jetbrainsMonoRegular from "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff?inline";
import schibstedGroteskRegular from "@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-400-normal.woff?inline";
import schibstedGroteskMedium from "@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-500-normal.woff?inline";
import { createFileRoute } from "@tanstack/react-router";
import { Renderer } from "takumi-js/node";
import { ImageResponse } from "takumi-js/response";

import avatarJpg from "@/assets/avatar.jpg?inline";
import authorConfig from "@/lib/config/author";
import { getPost, POSTS_DIR } from "@/lib/posts";

// https://developers.facebook.com/docs/sharing/webmasters/images/
const size = {
  width: 1200,
  height: 630,
} as const;

/** Every image co-located with a post, as lazily-imported data: URLs (so they're bundled; no filesystem reads). */
const postImages = import.meta.glob<string>("/notes/*/*.{png,jpg,jpeg}", {
  query: "?inline",
  import: "default",
});

/** Decodes a base64 data: URL from a Vite `?inline` import. */
const fromDataUrl = (dataUrl: string): Uint8Array =>
  Uint8Array.from(Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64"));

let renderer: Promise<Renderer> | undefined;

/** A renderer with the site's fonts registered, created once per server instance. */
const getRenderer = () =>
  (renderer ??= (async () => {
    const instance = new Renderer();
    await Promise.all([
      instance.registerFont({
        name: "Schibsted Grotesk",
        data: fromDataUrl(schibstedGroteskRegular),
        weight: 400,
        style: "normal",
      }),
      instance.registerFont({
        name: "Schibsted Grotesk",
        data: fromDataUrl(schibstedGroteskMedium),
        weight: 500,
        style: "normal",
      }),
      instance.registerFont({
        name: "JetBrains Mono",
        data: fromDataUrl(jetbrainsMonoRegular),
        weight: 400,
        style: "normal",
      }),
    ]);
    return instance;
  })());

const renderImage = async (slug: string): Promise<Response> => {
  const post = getPost(slug);
  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const loadPostImage = post.image
    ? postImages[`/${POSTS_DIR}/${slug}/${post.image.replace(/^\.\//, "")}`]
    : undefined;
  const postImage = loadPostImage ? fromDataUrl(await loadPostImage()) : undefined;

  const hasImage = Boolean(postImage);
  const titleLength = post.title.length;
  const titleSize = hasImage
    ? titleLength > 76
      ? 38
      : titleLength > 52
        ? 46
        : 58
    : titleLength > 88
      ? 54
      : titleLength > 60
        ? 64
        : 72;
  const publishedAt = new Date(post.date).toLocaleDateString(import.meta.env.VITE_SITE_LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    <div
      style={{
        ...size,
        display: "flex",
        flexDirection: "column",
        padding: "52px 64px 46px",
        backgroundColor: "#ffffff",
        color: "#171717",
        fontFamily: "Schibsted Grotesk",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingBottom: 24,
          borderBottom: "2px solid #171717",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="avatar" alt="" width={48} height={48} style={{ borderRadius: "50%" }} />
          <span
            style={{
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: "-0.035em",
            }}
          >
            {authorConfig.name}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          gap: 44,
          padding: "34px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "block",
              fontSize: titleSize,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              textWrap: "balance",
              lineClamp: 5,
            }}
          >
            {post.title}
          </div>
        </div>

        {hasImage && (
          <div
            style={{
              display: "flex",
              width: 420,
              height: 350,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: 10,
            }}
          >
            <img
              src="post"
              alt=""
              width={420}
              height={350}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 20,
          borderTop: "1px solid #e5e5e5",
          fontSize: 18,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 15,
            color: "#737373",
            letterSpacing: "-0.025em",
          }}
        >
          jarv.is/{POSTS_DIR}/{slug}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 15,
            color: "#737373",
            letterSpacing: "-0.025em",
          }}
        >
          {publishedAt}
        </span>
      </div>
    </div>,
    {
      ...size,
      renderer: await getRenderer(),
      images: [
        { src: "avatar", data: fromDataUrl(avatarJpg) },
        ...(postImage ? [{ src: "post", data: postImage }] : []),
      ],
      headers: {
        // regenerated on each deploy (Vercel's CDN cache is per-deployment)
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      },
    },
  );
};

export const Route = createFileRoute("/notes/$slug_/opengraph-image.png")({
  server: {
    handlers: {
      GET: ({ params }) => renderImage(params.slug),
    },
  },
});
