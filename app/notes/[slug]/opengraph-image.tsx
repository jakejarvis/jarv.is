/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import glob from "fast-glob";
import { getPostSlugs, getFrontMatter } from "../../../lib/helpers/posts";

export const contentType = "image/png";
export const size = {
  // https://developers.facebook.com/docs/sharing/webmasters/images/
  width: 1200,
  height: 630,
};

const Image = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // check for invalid slug
  const validSlugs = await getPostSlugs();
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // search for an opengraph-image.* file next to the note's index.mdx and load it
  const imagePath = await glob(`notes/${slug}/opengraph-image.(png|jpg|jpeg)`);
  let imageSrc = null;
  if (imagePath.length > 0) {
    const imageData = await fs.readFile(path.join(process.cwd(), imagePath[0]));
    imageSrc = Uint8Array.from(imageData).buffer;
  }

  // load the author avatar
  const avatarData = await fs.readFile(path.join(process.cwd(), "public/static/me.jpg"));
  const avatarSrc = Uint8Array.from(avatarData).buffer;

  // load the Geist font from its npm package
  const geistFont = await fs.readFile(
    path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")
  );

  // load the note's front matter
  const { title } = await getFrontMatter(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Geist",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: -0.5,
          background: "linear-gradient(0deg, hsla(197, 14%, 57%, 1) 0%, hsla(192, 17%, 94%, 1) 100%)",
        }}
      >
        {imageSrc && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            position: "absolute",
            left: 0,
            bottom: 42,
            padding: "12px 20px",
            margin: "0 42px",
            width: "auto",
            maxWidth: "100%",
            backgroundColor: "rgba(16, 16, 16, 0.85)",
            fontSize: 40,
            lineHeight: 1.4,
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
          data: geistFont,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
};

export default Image;
