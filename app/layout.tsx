import { ViewTransition } from "react";
import { JsonLd } from "react-schemaorg";
import type { Person, WebSite } from "schema-dts";
import { Analytics } from "@/app/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { env } from "@/lib/env";
import { Inter, JetBrainsMono } from "@/lib/fonts";
import { defaultMetadata } from "@/lib/metadata";

import "./globals.css";

export const metadata = defaultMetadata;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang={env.NEXT_PUBLIC_SITE_LOCALE}
    className={`${Inter.variable} ${JetBrainsMono.variable}`}
    suppressHydrationWarning
  >
    <head>
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${env.NEXT_PUBLIC_BASE_URL}/#person`,
          name: authorConfig.name,
          url: env.NEXT_PUBLIC_BASE_URL,
          image: [`${env.NEXT_PUBLIC_BASE_URL}/opengraph-image.jpg`],
          sameAs: [
            env.NEXT_PUBLIC_BASE_URL,
            `https://${authorConfig.social?.mastodon}`,
            `https://github.com/${authorConfig.social?.github}`,
            `https://bsky.app/profile/${authorConfig.social?.bluesky}`,
            `https://twitter.com/${authorConfig.social?.twitter}`,
            `https://medium.com/@${authorConfig.social?.medium}`,
            `https://www.linkedin.com/in/${authorConfig.social?.linkedin}/`,
            `https://www.facebook.com/${authorConfig.social?.facebook}`,
            `https://www.instagram.com/${authorConfig.social?.instagram}/`,
          ],
        }}
      />

      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${env.NEXT_PUBLIC_BASE_URL}/#website`,
          name: siteConfig.name,
          url: env.NEXT_PUBLIC_BASE_URL,
          author: authorConfig.name,
          description: siteConfig.description,
          inLanguage: env.NEXT_PUBLIC_SITE_LOCALE,
          license: `https://spdx.org/licenses/${siteConfig.license}.html`,
        }}
      />
    </head>

    <body className="bg-background font-sans text-foreground antialiased">
      <Providers>
        <Header />
        <div className="mx-auto mt-4 w-full max-w-4xl px-5">
          <main>
            <ViewTransition>{children}</ViewTransition>
          </main>
        </div>
        <Footer />

        <Toaster position="bottom-center" hotkey={[]} />
        <Analytics />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
