import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { join } from "path";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { getPostSlugs, getFrontMatter } from "../../../lib/helpers/posts";
import { POSTS_DIR, AVATAR_PATH } from "../../../lib/config/constants";

export const contentType = "image/png";
export const size = {
  // https://developers.facebook.com/docs/sharing/webmasters/images/
  width: 1200,
  height: 630,
};

// generate and cache these images at build-time for each slug, since doing this on-demand is mega slow...
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const slugs = await getPostSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

const getLocalImage = async (src: string): Promise<ArrayBuffer | string> => {
  // https://stackoverflow.com/questions/5775469/whats-the-valid-way-to-include-an-image-with-no-src/14115340#14115340
  const NO_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  const imagePath = join(process.cwd(), src);

  try {
    if (!existsSync(imagePath)) {
      console.error(`[og-image] couldn't find an image file located at "${imagePath}"`);

      // return a 1x1 transparent gif if the image doesn't exist instead of crashing
      return NO_IMAGE;
    }

    // return the raw image data as a buffer
    return Uint8Array.from(await readFile(imagePath)).buffer;
  } catch (error) {
    // fail silently and return a 1x1 transparent gif instead of crashing
    console.error(`[og-image] found "${imagePath}" but couldn't read it:`, error);
    return NO_IMAGE;
  }
};

const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;

    // get the post's title and image filename from its frontmatter
    const frontmatter = await getFrontMatter(slug);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            background: "linear-gradient(0deg, hsla(197, 14%, 57%, 1) 0%, hsla(192, 17%, 94%, 1) 100%)",
          }}
        >
          {frontmatter!.image && (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                // @ts-expect-error
                src={await getLocalImage(`${POSTS_DIR}/${slug}/${frontmatter!.image}`)}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
          )}
          {AVATAR_PATH && (
            <div
              style={{
                display: "flex",
                position: "absolute",
                left: 42,
                top: 42,
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                // @ts-expect-error
                src={await getLocalImage(AVATAR_PATH)}
                style={{ height: 96, width: 96, borderRadius: "100%" }}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 0,
              bottom: 42,
              padding: "12px 20px",
              margin: "0 42px",
              backgroundColor: "rgba(16, 16, 16, 0.85)",
              fontFamily: "Geist",
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: -0.5,
              color: "#fefefe",
            }}
          >
            {frontmatter!.title}
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Geist",
            // load the Geist font directly from its npm package
            // IMPORTANT: include this exact path in next.config.ts under "outputFileTracingIncludes"
            data: await readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")),
            style: "normal",
            weight: 600,
          },
        ],
      }
    );
  } catch (error) {
    console.error("[og-image] error generating image:", error);
    notFound();
  }
};

export default Image;
