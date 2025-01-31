import { useRouter } from "next/router";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import { defaultSeo, socialProfileJsonLd } from "../lib/config/seo";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps as NextAppProps } from "next/app";

import { GeistMono, GeistSans } from "../lib/styles/fonts";
import "modern-normalize/modern-normalize.css";
import "../lib/styles/theme.css";
import "../lib/styles/global.css";

// https://nextjs.org/docs/basic-features/layouts#with-typescript
export type AppProps = NextAppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // get this page's URL with full domain, and hack around query parameters and anchors
  // NOTE: this assumes trailing slashes are enabled in next.config.js
  const canonical = `${process.env.NEXT_PUBLIC_BASE_URL || ""}${router.pathname === "/" ? "" : router.pathname}/`;

  // allow layout overrides per-page, but default to plain `<Layout />`
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --fonts-sans: ${GeistSans.style.fontFamily};
            --fonts-mono: ${GeistMono.style.fontFamily};
          }
        `}
      </style>

      <DefaultSeo
        // all SEO config is in ../lib/config/seo.ts except for canonical URLs, which require access to next router
        {...defaultSeo}
        canonical={canonical}
        openGraph={{
          ...defaultSeo.openGraph,
          url: canonical,
        }}
        // don't let search engines index branch/deploy previews
        dangerouslySetAllPagesToNoIndex={process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"}
        dangerouslySetAllPagesToNoFollow={process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"}
      />
      <SocialProfileJsonLd {...socialProfileJsonLd} />

      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>

      <Analytics />
    </>
  );
};

export default App;
