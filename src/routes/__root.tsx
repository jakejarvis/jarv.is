import schibstedGroteskWoff2 from "@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { Person, WebSite } from "schema-dts";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toast";
import { VercelAnalytics } from "@/components/vercel-analytics";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { defaultHead, jsonLd, notFoundHead } from "@/lib/metadata";

import "@/styles/globals.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Route = createRootRoute({
  head: ({ matches }) => {
    const fontPreload = {
      rel: "preload",
      href: schibstedGroteskWoff2,
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    } as const;

    const siteJsonLd = [
      jsonLd<Person>({
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: authorConfig.name,
        url: BASE_URL,
        image: [`${BASE_URL}/opengraph-image.jpg`],
        sameAs: [
          BASE_URL,
          authorConfig.social.mastodon.replace(/^@([^@]+)@(.+)$/, "https://$2/@$1"),
          `https://github.com/${authorConfig.social.github}`,
          `https://bsky.app/profile/${authorConfig.social.bluesky}`,
          `https://twitter.com/${authorConfig.social.twitter}`,
          `https://medium.com/@${authorConfig.social.medium}`,
          `https://www.linkedin.com/in/${authorConfig.social.linkedin}/`,
          `https://www.facebook.com/${authorConfig.social.facebook}`,
          `https://www.instagram.com/${authorConfig.social.instagram}/`,
        ],
      }),
      jsonLd<WebSite>({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: siteConfig.name,
        url: BASE_URL,
        author: authorConfig.name,
        description: siteConfig.description,
        inLanguage: import.meta.env.VITE_SITE_LOCALE,
        license: `https://spdx.org/licenses/${siteConfig.license}.html`,
      }),
    ];

    // a global not-found (unknown URL, or a loader's notFound() bubbling up to this route) gets its own head
    // oxlint-disable-next-line no-underscore-dangle -- the router's only per-match flag for a global not-found
    if (matches.some((match) => match.status === "notFound" || match._notFound)) {
      return {
        meta: [...notFoundHead.meta, ...siteJsonLd],
        links: [fontPreload, ...notFoundHead.links],
      };
    }

    return {
      meta: [...defaultHead.meta, ...siteJsonLd],
      links: [fontPreload, ...defaultHead.links],
    };
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={import.meta.env.VITE_SITE_LOCALE} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>

      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="mx-auto w-full max-w-[720px] px-5">
            <Header />
            <main className="mt-4 w-full">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
        <VercelAnalytics />
        <Scripts />
      </body>
    </html>
  );
}
