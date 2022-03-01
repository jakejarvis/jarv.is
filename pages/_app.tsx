import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import * as Fathom from "fathom-client";
import { globalStyles, theme, darkTheme } from "../lib/styles/stitches.config";
import Layout from "../components/Layout/Layout";
import * as config from "../lib/config";
import { defaultSeo, socialProfileJsonLd } from "../lib/config/seo";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps as NextAppProps } from "next/app";

// only most important webfonts here for preloading -- see ../lib/styles/vendor/fonts for the full families
// TODO: fix webpack/type warnings
// @ts-ignore
import interLatinVarFullNormalWoff2 from "@fontsource/inter/files/inter-latin-variable-full-normal.woff2";
// @ts-ignore
import robotoMonoLatinVarWghtOnlyNormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-variable-wghtOnly-normal.woff2";

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
  const canonical = `${config.baseUrl}${router.pathname === "/" ? "" : router.pathname}/`;

  useEffect(() => {
    // https://usefathom.com/docs/integrations/next
    // https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel
    Fathom.load(config.fathomSiteId, {
      // don't track branch/deploy previews and localhost
      includedDomains: [config.siteDomain],
      // we trigger pageview sending manually below, don't also do it on script load
      auto: false,
    });

    const onRouteChangeComplete = (url: string) => {
      Fathom.trackPageview({ url });
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

  // inject body styles defined in ../stitches.config.ts
  globalStyles();

  return (
    <>
      {/* static asset preloads */}
      <Head>
        <link rel="preload" as="font" type="font/woff2" href={interLatinVarFullNormalWoff2} crossOrigin="anonymous" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href={robotoMonoLatinVarWghtOnlyNormalWoff2}
          crossOrigin="anonymous"
        />
      </Head>

      {/* all SEO config is in ../lib/seo.ts except for canonical URLs, which require access to next router */}
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

      {/* NOTE: this *must* come last in this fragment */}
      {/* classnames are generated dynamically by stitches, so have ThemeProvider talk to it */}
      <ThemeProvider attribute="class" value={{ light: theme.className, dark: darkTheme.className }}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
};

export default App;
