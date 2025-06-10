import { env } from "@/lib/env";
import { JsonLd } from "react-schemaorg";
import { ThemeProvider } from "@/components/theme/theme-context";
import { ThemeScript } from "@/components/theme/theme-script";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Toaster from "@/components/ui/sonner";
import Analytics from "@/app/analytics";
import { defaultMetadata } from "@/lib/metadata";
import { GeistSans, GeistMono } from "@/lib/fonts";
import siteConfig from "@/lib/config/site";
import authorConfig from "@/lib/config/author";
import type { Person, WebSite } from "schema-dts";

import "./globals.css";

export const metadata = defaultMetadata;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang={env.NEXT_PUBLIC_SITE_LOCALE}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
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
          <div className="mx-auto w-full max-w-4xl px-5">
            <Header className="mt-4 mb-6 w-full" />

            <main>{children}</main>

            <Footer className="my-6 w-full" />
          </div>

          <Toaster position="bottom-center" hotkey={[]} />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
