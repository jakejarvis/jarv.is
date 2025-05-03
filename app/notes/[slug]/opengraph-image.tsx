import { env } from "@/lib/env";
import path from "path";
import fs from "fs";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getSlugs, getFrontMatter } from "@/lib/helpers/posts";
import siteConfig from "@/lib/config/site";
import { POSTS_DIR } from "@/lib/config/constants";

export const contentType = "image/png";
export const size = {
  // https://developers.facebook.com/docs/sharing/webmasters/images/
  width: 1200,
  height: 630,
};

// generate and cache these images at build-time for each slug, since doing this on-demand is mega slow...
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const slugs = await getSlugs();

  // map slugs into a static paths object required by next.js
  return slugs.map((slug) => ({
    slug,
  }));
};

const getLocalImage = async (src: string): Promise<ArrayBuffer | string> => {
  // https://stackoverflow.com/questions/5775469/whats-the-valid-way-to-include-an-image-with-no-src/14115340#14115340
  const NO_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  const imagePath = path.join(process.cwd(), src);

  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`[/notes/[slug]/opengraph-image] couldn't find an image file located at "${imagePath}"`);

      // return a 1x1 transparent gif if the image doesn't exist instead of crashing
      return NO_IMAGE;
    }

    // return the raw image data as a buffer
    return Uint8Array.from(await fs.promises.readFile(imagePath)).buffer;
  } catch (error) {
    console.error(`[/notes/[slug]/opengraph-image] found "${imagePath}" but couldn't read it:`, error);

    // fail silently and return a 1x1 transparent gif instead of crashing
    return NO_IMAGE;
  }
};

const OpenGraphImage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;

    // get the post's title and image filename from its frontmatter
    const frontmatter = await getFrontMatter(slug);

    const [postImg, avatarImg, fontRegular, fontSemiBold] = await Promise.all([
      frontmatter!.image ? getLocalImage(`${POSTS_DIR}/${slug}/${frontmatter!.image}`) : null,

      // IMPORTANT: include these exact paths in next.config.ts under "outputFileTracingIncludes"
      getLocalImage("app/avatar.jpg"),
      // load the Geist font directly from its npm package
      fs.promises.readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
      fs.promises.readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")),
    ]);

    // template is HEAVILY inspired by https://og-new.clerkstage.dev/
    return new ImageResponse(
      (
        <div
          style={{
            ...size,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(to top right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              inset: 0,
              filter: "brightness(100%) contrast(150%)",
              opacity: "0.1",
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><filter id="noise" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feBlend mode="screen"/></filter><rect width="500" height="500" filter="url(#noise)" opacity="1"/></svg>')`,
              backgroundRepeat: "repeat",
            }}
          ></div>

          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              opacity: "0.4",
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd" fill="#6b7280" fill-opacity="0.4"><g><path opacity="0.5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/><path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z"/></g></g></svg>')`,
              maskImage: "radial-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 80%)",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "1.5rem",
              paddingLeft: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1.5rem",
                flexShrink: 0,
                paddingTop: "2rem",
                // don't wrap the title text if there's no image to leave room for
                width: postImg ? "35%" : "100%",
                marginRight: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "0.75rem",
                }}
              >
                {avatarImg && (
                  <img
                    // @ts-expect-error
                    src={avatarImg}
                    alt=""
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: "1.825rem",
                    fontFamily: "Geist-SemiBold",
                    fontWeight: 700,
                    lineHeight: "3rem",
                    letterSpacing: "-0.015em",
                    marginLeft: "0.75rem",
                  }}
                >
                  {siteConfig.name}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexGrow: 0,
                  fontFamily: "Geist-SemiBold",
                  fontWeight: 700,
                  fontSize: "48px",
                  color: "#030712",
                  letterSpacing: "-0.025em",
                  lineHeight: "1.2",
                }}
              >
                {frontmatter!.title}
              </div>

              <div
                style={{
                  display: "flex",
                  flexGrow: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "Geist-Regular",
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "#030712",
                    border: "solid",
                    borderRadius: "100",
                    borderWidth: "2px",
                    paddingRight: "16px",
                    paddingLeft: "16px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  {POSTS_DIR.charAt(0).toUpperCase() + POSTS_DIR.slice(1)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexGrow: 0,
                  fontFamily: "Geist-Regular",
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#030712",
                  letterSpacing: "-0.025em",
                  lineHeight: "1.2",
                }}
              >
                {new Date(frontmatter!.date).toLocaleDateString(env.NEXT_PUBLIC_SITE_LOCALE, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {postImg && (
              <div
                style={{
                  display: "flex",
                  width: "100%", // less than half in reality, but this gives the image the overflow look
                  flexGrow: 0,
                }}
              >
                <img
                  // @ts-expect-error
                  src={postImg}
                  alt=""
                  style={{
                    maxHeight: "100%",
                    minHeight: 630,
                    width: "auto",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Geist-Regular",
            data: fontRegular,
            style: "normal",
            weight: 400,
          },
          {
            name: "Geist-SemiBold",
            data: fontSemiBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error("[/notes/[slug]/opengraph-image] error generating open graph image:", error);
    notFound();
  }
};

export default OpenGraphImage;
