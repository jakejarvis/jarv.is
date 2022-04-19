import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import * as Fathom from "fathom-client";
import urlJoin from "url-join";
import { ThemeProvider } from "../contexts/ThemeContext";
import Layout from "../components/Layout";
import * as config from "../lib/config";
import { defaultSeo, socialProfileJsonLd } from "../lib/config/seo";
import { themeClassNames } from "../lib/styles/helpers/themes";
import { globalStyles } from "../lib/styles/stitches.config";
import type { AppProps as NextAppProps } from "next/app";

// https://nextjs.org/docs/basic-features/layouts#with-typescript
const App = ({ Component, pageProps }: NextAppProps) => {
  const router = useRouter();

  // get this page's URL with full domain, and hack around query parameters and anchors
  // NOTE: this assumes trailing slashes are enabled in next.config.js
  const canonical = urlJoin(config.baseUrl, router.pathname === "/" ? "" : router.pathname, "/");

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
  }, [router.events]);

  // inject body styles defined in ../lib/styles/stitches.config.ts
  globalStyles();

  return (
    <ThemeProvider classNames={themeClassNames}>
      {/* all SEO config is in ../lib/config/seo.ts except for canonical URLs, which require access to next router */}
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

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
