import path from "node:path";

import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

import { staticPaths } from "./src/lib/config/pages";
import {
  rehypeMdxCodeProps,
  rehypeMdxImportMedia,
  rehypeSlug,
  rehypeUnwrapImages,
  rehypeWrapper,
} from "./src/lib/rehype";
import { rehypeImageSize } from "./src/lib/rehype-image-size";
import {
  remarkFrontmatter,
  remarkGfm,
  remarkMdxFrontmatter,
  remarkSmartypants,
} from "./src/lib/remark";

// TODO(migration): remove once the Vercel project has VITE_* env vars (until then, reuse the Next.js-era ones)
for (const key of ["BASE_URL", "SITE_LOCALE", "GITHUB_REPO", "GITHUB_USERNAME"]) {
  const legacyValue = process.env[`NEXT_PUBLIC_${key}`];
  // (assigning `undefined` to process.env would store the string "undefined")
  if (legacyValue && !process.env[`VITE_${key}`]) process.env[`VITE_${key}`] = legacyValue;
}

const serverExternals = ["takumi-js", "@takumi-rs/core"];

/**
 * Enables Vercel's image optimization API at /_vercel/image (see src/lib/image.ts). Declared separately because nitro's
 * types lag behind the Build Output API (e.g. `qualities`); it's passed through to .vercel/output/config.json as-is.
 */
const vercelImages = {
  sizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  domains: [] as string[],
  remotePatterns: [
    {
      protocol: "https" as const,
      hostname: "^avatars\\.githubusercontent\\.com$",
    },
    {
      protocol: "https" as const,
      hostname: "^ijyxfbpcm3itvdly\\.public\\.blob\\.vercel-storage\\.com$",
    },
  ],
  qualities: [50, 75, 100],
  formats: ["image/avif" as const, "image/webp" as const],
  minimumCacheTTL: 2_678_400,
};

export default defineConfig({
  resolve: {
    alias: {
      // explicit (instead of tsconfig paths) so it also resolves inside .mdx files
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  define: {
    // only Vercel deployments have the image optimization API (see src/lib/image.ts)
    "import.meta.env.VITE_VERCEL_IMAGES": JSON.stringify(process.env.VERCEL === "1"),
  },
  ssr: {
    // RSC forces `ssr.noExternal: true`, but explicitly listed externals still win: takumi's native renderer has to be
    // loaded (and traced into the server output) by Node at runtime, not bundled
    external: serverExternals,
  },
  environments: {
    client: {
      build: {
        sourcemap: true,
      },
    },
    rsc: {
      resolve: {
        external: serverExternals,
      },
    },
  },
  plugins: [
    contentCollections(),
    {
      enforce: "pre",
      ...mdx({
        // no providerImportSource: @mdx-js/react calls createContext(), which doesn't exist in the RSC environment.
        // components are passed to each MDX module as a prop instead (see src/lib/content/render.server.tsx).
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkSmartypants],
        rehypePlugins: [
          rehypeUnwrapImages,
          rehypeSlug,
          [rehypeWrapper, { className: "markdown" }],
          rehypeMdxCodeProps,
          // must run before rehype-mdx-import-media replaces relative srcs with imports
          rehypeImageSize,
          rehypeMdxImportMedia,
        ],
      }),
    },
    tailwindcss(),
    tanstackStart({
      rsc: {
        enabled: true,
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // only crawl into known pages and posts (posts link to some long-dead URLs, e.g. /contact)
        filter: ({ path: pagePath }) =>
          (staticPaths as readonly string[]).includes(pagePath) ||
          /^\/notes\/[^/]+$/.test(pagePath),
      },
      pages: staticPaths.map((pagePath) => ({ path: pagePath })),
    }),
    rsc(),
    viteReact({ include: /\.(mdx|[jt]sx?)$/ }),
    babel({ presets: [reactCompilerPreset()] }),
    nitro({
      vercel: {
        config: {
          version: 3,
          images: vercelImages,
        },
      },
    }),
  ],
});
