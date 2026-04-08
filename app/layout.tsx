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
import { Inter, JetBrainsMono } from "@/lib/fonts";

import "./globals.css";
import { defaultMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = defaultMetadata;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang={process.env.NEXT_PUBLIC_SITE_LOCALE}
    className={cn(Inter.variable, JetBrainsMono.variable)}
    suppressHydrationWarning
  >
    <head>
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#person`,
          name: authorConfig.name,
          url: process.env.NEXT_PUBLIC_BASE_URL!,
          image: [`${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.jpg`],
          sameAs: [
            process.env.NEXT_PUBLIC_BASE_URL!,
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
          "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#website`,
          name: siteConfig.name,
          url: process.env.NEXT_PUBLIC_BASE_URL,
          author: authorConfig.name,
          description: siteConfig.description,
          inLanguage: process.env.NEXT_PUBLIC_SITE_LOCALE,
          license: `https://spdx.org/licenses/${siteConfig.license}.html`,
        }}
      />
    </head>

    <body className="bg-background text-foreground font-sans antialiased">
      <Providers>
        <div className="mx-auto w-full max-w-[720px] px-5">
          <Header />
          <main className="mt-4 w-full">
            <ViewTransition>{children}</ViewTransition>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-center" hotkey={[]} />
      </Providers>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
