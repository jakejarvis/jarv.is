import fs from "node:fs";
import path from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import authorConfig from "@/lib/config/author";
import { getFrontMatter, getSlugs, POSTS_DIR } from "@/lib/posts";

const loadGoogleFont = async (font: string, weight: number): Promise<ArrayBuffer> => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
  const cache = { next: { revalidate: 31_536_000 } };
  const cssResponse = await fetch(url, cache);

  if (!cssResponse.ok) {
    throw new Error(`Failed to load font: ${font} ${weight}`);
  }

  const css = await cssResponse.text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const fontResponse = await fetch(resource[1], cache);
    if (fontResponse.ok) {
      return fontResponse.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font: ${font} ${weight}`);
};

const getLocalImage = async (src: string): Promise<ArrayBuffer | string> => {
  "use cache";

  // https://stackoverflow.com/questions/5775469/whats-the-valid-way-to-include-an-image-with-no-src/14115340#14115340
  const NO_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  const imagePath = path.join(/* turbopackIgnore: true */ process.cwd(), src);

  try {
    if (!fs.existsSync(imagePath)) {
      console.error(
        `[/notes/[slug]/opengraph-image] couldn't find an image file located at "${imagePath}"`,
      );
      return NO_IMAGE;
    }

    return Uint8Array.from(await fs.promises.readFile(imagePath)).buffer;
  } catch (error) {
    console.error(
      `[/notes/[slug]/opengraph-image] found "${imagePath}" but couldn't read it:`,
      error,
    );
    return NO_IMAGE;
  }
};

export const contentType = "image/png";
export const size = {
  // https://developers.facebook.com/docs/sharing/webmasters/images/
  width: 1200,
  height: 630,
};

export const generateStaticParams = () =>
  getSlugs().map((slug) => ({
    slug,
  }));

const OpenGraphImage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const frontmatter = getFrontMatter(slug);
  if (!frontmatter) notFound();

  const [postImage, avatarImage, sansRegular, sansMedium, monoRegular] = await Promise.all([
    frontmatter.image ? getLocalImage(`${POSTS_DIR}/${slug}/${frontmatter.image}`) : null,
    getLocalImage("app/avatar.jpg"),
    loadGoogleFont("Schibsted Grotesk", 400),
    loadGoogleFont("Schibsted Grotesk", 500),
    loadGoogleFont("JetBrains Mono", 400),
  ]);

  const hasImage = Boolean(postImage);
  const titleLength = frontmatter.title.length;
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
  const publishedAt = new Date(frontmatter.date).toLocaleDateString(
    process.env.NEXT_PUBLIC_SITE_LOCALE,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

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
          {/* oxlint-disable-next-line nextjs/no-img-element - Satori requires a raw img. */}
          <img
            // @ts-expect-error -- ImageResponse accepts ArrayBuffer image sources.
            src={avatarImage}
            alt=""
            width={48}
            height={48}
            style={{ borderRadius: "50%" }}
          />
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
            {frontmatter.title}
          </div>
        </div>

        {postImage && (
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
            {/* oxlint-disable-next-line nextjs/no-img-element - Satori requires a raw img. */}
            <img
              // @ts-expect-error -- ImageResponse accepts ArrayBuffer image sources.
              src={postImage}
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
      fonts: [
        {
          name: "Schibsted Grotesk",
          data: sansRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Schibsted Grotesk",
          data: sansMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "JetBrains Mono",
          data: monoRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
};

export default OpenGraphImage;
