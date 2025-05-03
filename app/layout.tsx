import { env } from "@/lib/env";
import { JsonLd } from "react-schemaorg";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, ThemeScript } from "@/components/ui/theme-context";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { SkipNavLink, SkipNavTarget } from "@/components/ui/skip-nav";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/lib/helpers/metadata";
import siteConfig from "@/lib/config/site";
import authorConfig from "@/lib/config/author";
import type { Person, WebSite } from "schema-dts";

import { GeistMono, GeistSans } from "./fonts";
import "./globals.css";

export const metadata = defaultMetadata;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang={env.NEXT_PUBLIC_SITE_LOCALE}
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />

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

      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <SkipNavLink />

          <div className="max-w-default mx-auto w-full px-5 pt-2 pb-6">
            <Header className="mb-4 h-24 w-full md:h-18" />

            <main>
              <SkipNavTarget />
              {children}
            </main>

            <Footer className="mt-6 w-full" />
          </div>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
