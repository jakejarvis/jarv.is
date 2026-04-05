import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "takumi-js/response";
import { createFileRoute } from "@tanstack/react-router";
import { allPosts } from "content-collections";

import siteConfig from "@/lib/config/site";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const loadLocalImage = (filePath: string): ArrayBuffer | null => {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    if (!fs.existsSync(fullPath)) return null;
    return Uint8Array.from(fs.readFileSync(fullPath)).buffer;
  } catch {
    return null;
  }
};

const loadGoogleFont = async (font: string, weight: number): Promise<ArrayBuffer> => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
  const css = await fetch(url).then((r) => r.text());
  const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!match?.[1]) throw new Error(`Failed to load font: ${font}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
};

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (!slug) {
          return new Response("Missing slug parameter", {
            status: 400,
          });
        }

        const post = allPosts.find((p) => p.slug === slug);
        if (!post) {
          return new Response("Post not found", { status: 404 });
        }

        const avatarImg = loadLocalImage("src/app/avatar.jpg");
        const postImg = post.image ? loadLocalImage(`notes/${slug}/${post.image}`) : null;

        const [fontRegular, fontSemibold] = await Promise.all([
          loadGoogleFont("Inter", 400),
          loadGoogleFont("Inter", 600),
        ]);

        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return new ImageResponse(
          <div tw="flex flex-col w-full h-full bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600">
            {/* Noise overlay */}
            <div
              tw="absolute inset-0 w-full h-full"
              style={{
                opacity: 0.1,
                filter: "brightness(100%) contrast(150%)",
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><filter id="noise" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feBlend mode="screen"/></filter><rect width="500" height="500" filter="url(${encodeURIComponent("#noise")})" opacity="1"/></svg>')`,
                backgroundRepeat: "repeat",
              }}
            />

            {/* Content */}
            <div tw="flex w-full px-8" style={{ gap: "1.5rem" }}>
              <div
                tw="flex flex-col shrink-0 pt-8"
                style={{
                  gap: "1.5rem",
                  width: postImg ? "35%" : "100%",
                  marginRight: "0.75rem",
                }}
              >
                {/* Author */}
                <div tw="flex mb-3 items-center">
                  {avatarImg && (
                    <img
                      src={avatarImg as unknown as string}
                      alt=""
                      width={48}
                      height={48}
                      tw="rounded-full"
                    />
                  )}
                  <span
                    tw="ml-3"
                    style={{
                      fontSize: "1.825rem",
                      fontWeight: 600,
                      lineHeight: "3rem",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {siteConfig.name}
                  </span>
                </div>

                {/* Title */}
                <div
                  tw="flex"
                  style={{
                    fontWeight: 600,
                    fontSize: "48px",
                    color: "#030712",
                    letterSpacing: "-0.025em",
                    lineHeight: "1.2",
                  }}
                >
                  {post.title}
                </div>

                {/* Badge */}
                <div tw="flex">
                  <span
                    tw="border-2 border-black rounded-full px-4 py-1"
                    style={{
                      fontWeight: 400,
                      fontSize: "20px",
                      color: "#030712",
                    }}
                  >
                    Notes
                  </span>
                </div>

                {/* Date */}
                <div
                  tw="flex"
                  style={{
                    fontWeight: 400,
                    fontSize: "24px",
                    color: "#030712",
                    letterSpacing: "-0.025em",
                    lineHeight: "1.2",
                  }}
                >
                  {formattedDate}
                </div>
              </div>

              {/* Post image */}
              {postImg && (
                <div tw="flex w-full" style={{ flexGrow: 0 }}>
                  <img
                    src={postImg as unknown as string}
                    alt=""
                    style={{
                      maxHeight: "100%",
                      minHeight: OG_HEIGHT,
                      width: "auto",
                    }}
                  />
                </div>
              )}
            </div>
          </div>,
          {
            width: OG_WIDTH,
            height: OG_HEIGHT,
            fonts: [
              {
                name: "Inter",
                data: fontRegular,
                weight: 400,
                style: "normal",
              },
              {
                name: "Inter",
                data: fontSemibold,
                weight: 600,
                style: "normal",
              },
            ],
          },
        );
      },
    },
  },
});
