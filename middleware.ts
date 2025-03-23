import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import * as siteConfig from "./lib/config";

// assign "short codes" to approved reverse proxy destinations. for example:
//   ["abc", "https://jakejarvis.github.io"] => /_stream/abc/123.html -> https://jakejarvis.github.io/123.html
const rewritePrefix = "/_stream/";
const rewrites = new Map([
  // umami backend, see https://umami.is/docs/guides/running-on-vercel#proxy-umami-analytics-via-vercel
  ["u", process.env.NEXT_PUBLIC_UMAMI_URL || "https://cloud.umami.is"],
]);

export const middleware = (request: NextRequest) => {
  const headers = new Headers();

  // https://gitweb.torproject.org/tor-browser-spec.git/tree/proposals/100-onion-location-header.txt
  if (siteConfig.onionDomain) {
    const onionUrl = request.nextUrl.clone();
    onionUrl.hostname = siteConfig.onionDomain;
    onionUrl.protocol = "http";
    onionUrl.port = "";

    headers.set("onion-location", onionUrl.toString());
  }

  // debugging 🥛
  headers.set("x-got-milk", "2%");

  if (request.nextUrl.pathname.startsWith(rewritePrefix)) {
    // extract the short code
    const pathAfterPrefix = request.nextUrl.pathname.slice(rewritePrefix.length);
    const slashIndex = pathAfterPrefix.indexOf("/");
    const key = slashIndex === -1 ? pathAfterPrefix : pathAfterPrefix.slice(0, slashIndex);

    // search the rewrite map for the short code
    const proxiedOrigin = rewrites.get(key);

    // return a 400 error if a rewrite was requested but the short code isn't found
    if (!proxiedOrigin) {
      return NextResponse.json(
        { error: "Unknown proxy key" },
        {
          status: 400,
          headers,
        }
      );
    }

    // it's now safe to build the rewritten URL
    const proxiedPath = slashIndex === -1 ? "/" : pathAfterPrefix.slice(slashIndex);
    const proxiedUrl = new URL(`${proxiedPath}${request.nextUrl.search}`, proxiedOrigin);

    headers.set("x-rewrite-url", proxiedUrl.toString());

    // finally do the rewriting
    return NextResponse.rewrite(proxiedUrl, {
      request,
      headers,
    });
  }

  // if we've gotten this far, continue normally to next.js
  return NextResponse.next({
    request,
    headers,
  });
};

export const config = {
  // save compute time by skipping middleware for static and metadata files
  matcher: [
    "/((?!_next/static|_next/image|_vercel|static|\\.well-known|favicon.ico|icon.png|apple-icon.png|sitemap.xml|robots.txt|manifest.webmanifest|feed.xml|feed.atom).*)",
  ],
};
