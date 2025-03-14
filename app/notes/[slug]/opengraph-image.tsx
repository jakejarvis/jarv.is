/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";
import { getPostSlugs, getFrontMatter } from "../../../lib/helpers/posts";

export const dynamicParams = false;
export const contentType = "image/png";
export const size = {
  // https://developers.facebook.com/docs/sharing/webmasters/images/
  width: 1200,
  height: 630,
};

export const generateStaticParams = async () => {
  const slugs = await getPostSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

const getLocalImage = async (src: string) => {
  const imagePath = await glob(src);
  if (imagePath.length > 0) {
    const imageData = await fs.readFile(path.join(process.cwd(), imagePath[0]));
    return Uint8Array.from(imageData).buffer;
  }

  // image doesn't exist
  return null;
};

const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;

    // get the note's title and image filename from its frontmatter
    const { title, image } = await getFrontMatter(slug);

    // load the image specified in the note's frontmatter from its directory
    const imageSrc = await getLocalImage(`notes/${slug}/${image}`);

    // load the author avatar
    const avatarSrc = await getLocalImage("public/static/me.jpg");

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
          {imageSrc && (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
              }}
            >
              <img
                // @ts-expect-error
                src={imageSrc}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
          )}
          {avatarSrc && (
            <div
              style={{
                display: "flex",
                position: "absolute",
                left: 42,
                top: 42,
              }}
            >
              <img
                // @ts-expect-error
                src={avatarSrc}
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
            {title}
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Geist",
            // load the Geist font directly from its npm package
            data: await fs.readFile(
              path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")
            ),
            style: "normal",
            weight: 600,
          },
        ],
      }
    );
  } catch (error) {
    console.error("[og-image] Error generating image:", error);
    notFound();
  }
};

export default Image;
