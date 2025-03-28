import { NextResponse } from "next/server";
import type { NextRequest, MiddlewareConfig } from "next/server";

// assign "short codes" to approved reverse proxy destinations. for example:
//   ["abc", "https://jakejarvis.github.io"] => /_stream/abc/123.html -> https://jakejarvis.github.io/123.html
const rewritePrefix = "/_stream/";
const rewrites = new Map();

// umami backend, see https://umami.is/docs/guides/running-on-vercel#proxy-umami-analytics-via-vercel
if (process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
  rewrites.set("u", process.env.NEXT_PUBLIC_UMAMI_URL || "https://cloud.umami.is");
}

export const middleware = (request: NextRequest) => {
  const headers = new Headers();

  // https://community.torproject.org/onion-services/advanced/onion-location/
  if (process.env.NEXT_PUBLIC_ONION_DOMAIN) {
    const onionUrl = request.nextUrl.clone();
    onionUrl.hostname = process.env.NEXT_PUBLIC_ONION_DOMAIN;
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

export const config: MiddlewareConfig = {
  // save compute time by skipping middleware for next.js internals and static files
  matcher: [
    "/((?!_next/|_vercel/|api/|\\.well-known/|[^?]*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|webm|mp4|ttf|woff2?|xml|atom|txt|pdf|webmanifest)).*)",
  ],
};
