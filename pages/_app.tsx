import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import * as Fathom from "fathom-client";
import * as config from "../lib/config";
import type { AppProps } from "next/app";

import faviconIco from "../public/static/favicons/favicon.ico";
import faviconPng from "../public/static/favicons/favicon.png";
import appleTouchIconPng from "../public/static/favicons/apple-touch-icon.png";
import meJpg from "../public/static/images/me.jpg";

// global styles
import "modern-normalize/modern-normalize.css";
import "../styles/colors.scss";
import "../styles/typography.scss";
import "../styles/highlight.scss";
import "../styles/index.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // get this page's URL with full domain, and hack around query parameters and anchors
  // NOTE: this assumes trailing slashes are enabled in next.config.js
  const canonical = `${config.baseUrl}${router.pathname === "/" ? "" : router.pathname}/`;

  useEffect(() => {
    // https://usefathom.com/docs/integrations/next
    // https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel
    Fathom.load(config.fathomSiteId, {
      url: `${config.fathomCustomDomain || "https://cdn.usefathom.com"}/script.js`,
      includedDomains: [config.siteDomain],
    });

    const onRouteChangeComplete = () => {
      Fathom.trackPageview();
    };

    // send ping when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      // unassign event listener
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* @ts-ignore */}
      <DefaultSeo
        defaultTitle={`${config.siteName} – ${config.shortDescription}`}
        titleTemplate={`%s – ${config.siteName}`}
        description={config.longDescription}
        canonical={canonical}
        openGraph={{
          site_name: config.siteName,
          title: `${config.siteName} – ${config.shortDescription}`,
          url: canonical,
          locale: config.siteLocale,
          type: "website",
          images: [
            {
              url: `${config.baseUrl}${meJpg.src}`,
              alt: `${config.siteName} – ${config.shortDescription}`,
            },
          ],
        }}
        twitter={{
          handle: `@${config.authorSocial.twitter}`,
          site: `@${config.authorSocial.twitter}`,
          cardType: "summary",
        }}
        facebook={{
          appId: config.facebookAppId,
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: faviconIco.src,
          },
          {
            rel: "icon",
            href: faviconPng.src,
            type: "image/png",
          },
          {
            rel: "apple-touch-icon",
            href: appleTouchIconPng.src,
            sizes: `${appleTouchIconPng.width}x${appleTouchIconPng.height}`,
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
          {
            rel: "alternate",
            href: "/feed.xml",
            type: "application/rss+xml",
            title: `${config.siteName} (RSS)`,
          },
          {
            rel: "alternate",
            href: "/feed.atom",
            type: "application/atom+xml",
            title: `${config.siteName} (Atom)`,
          },
          {
            rel: "preconnect",
            href: config.fathomCustomDomain,
          },
          {
            rel: "dns-prefetch",
            href: config.fathomCustomDomain,
          },
          {
            rel: "webmention",
            href: `https://webmention.io/${config.webmentionId}/webmention`,
          },
          {
            rel: "pingback",
            href: `https://webmention.io/${config.webmentionId}/xmlrpc`,
          },
          {
            rel: "humans",
            href: "/humans.txt",
          },
          {
            rel: "pgpkey",
            href: "/pubkey.asc",
            type: "application/pgp-keys",
          },
        ]}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          {
            name: "author",
            content: config.authorName,
          },
          {
            name: "monetization",
            content: config.monetization,
          },
          {
            name: "google-site-verification",
            content: "qQhmLTwjNWYgQ7W42nSTq63xIrTch13X_11mmxBE9zk",
          },
          {
            name: "facebook-domain-verification",
            content: "q45jxbgyp22ef55xror1pvbehisg9m",
          },
          {
            name: "msvalidate.01",
            content: "164551986DA47F7F6FC0D21A93FFFCA6",
          },
          {
            name: "twitter:dnt",
            content: "on",
          },
        ]}
      />
      <SocialProfileJsonLd
        type="Person"
        name={config.authorName}
        url={`${config.baseUrl}/`}
        sameAs={[
          `${config.baseUrl}/`,
          `https://github.com/${config.authorSocial.github}`,
          `https://keybase.io/${config.authorSocial.keybase}`,
          `https://twitter.com/${config.authorSocial.twitter}`,
          `https://medium.com/@${config.authorSocial.medium}`,
          `https://www.linkedin.com/in/${config.authorSocial.linkedin}/`,
          `https://www.facebook.com/${config.authorSocial.facebook}`,
          `https://www.instagram.com/${config.authorSocial.instagram}/`,
          `https://${config.authorSocial.mastodon}`,
        ]}
      />

      {/*
        Inline script to restore light/dark theme preference ASAP:
        `<html data-theme="...">`, `<meta name="color-scheme" ...>`, and color-scheme style
      */}
      <Script id="restore_theme" strategy="afterInteractive">{`try {
  var pref = localStorage.getItem("dark_mode"),
      dark = pref === "true" || (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches),
      meta = document.createElement("meta");
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  meta.setAttribute("name", "theme-color");
  meta.content = dark ? "${config.themeColorDark}" : "${config.themeColorLight}";
  document.head.prepend(meta);
} catch (e) {}`}</Script>

      <Component {...pageProps} />
    </>
  );
};

export default App;
