import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import * as Fathom from "fathom-client";
import Layout from "../components/Layout/Layout";
import * as config from "../lib/config";
import { defaultSeo, socialProfileJsonLd } from "../lib/seo";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// global webfonts -- imported here so they're processed through PostCSS
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/variable-full.css";
import "@fontsource/roboto-mono/latin-400.css";
import "@fontsource/roboto-mono/latin-500.css";
import "@fontsource/roboto-mono/latin-700.css";
import "@fontsource/roboto-mono/variable.css";
import "@fontsource/roboto-mono/variable-italic.css";

// global styles
import "modern-normalize/modern-normalize.css";
import "../styles/settings.css";
import "../styles/colors.css";
import "../styles/typography.css";
import "../styles/index.css";

// https://nextjs.org/docs/basic-features/layouts#with-typescript
type Props = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

const App = ({ Component, pageProps }: Props) => {
  const router = useRouter();

  // get this page's URL with full domain, and hack around query parameters and anchors
  // NOTE: this assumes trailing slashes are enabled in next.config.js
  const canonical = `${config.baseUrl}${router.pathname === "/" ? "" : router.pathname}/`;

  useEffect(() => {
    // https://usefathom.com/docs/integrations/next
    // https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel
    Fathom.load(config.fathomSiteId, {
      // don't track branch/deploy previews and localhost
      includedDomains: [config.siteDomain],
    });

    const onRouteChangeComplete = () => {
      Fathom.trackPageview();
    };

    // needs to be triggered manually on link clicks (the page doesn't actually change)
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      // unassign event listener
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // allow layout overrides per-page, but default to plain `<Layout />`
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>

      {/* all SEO config is in ./lib/seo.ts except for canonical URLs, which require access to next router */}
      <DefaultSeo
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
    </>
  );
};

export default App;
