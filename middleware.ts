import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import siteConfig from "./lib/config/constants";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // https://gitweb.torproject.org/tor-browser-spec.git/tree/proposals/100-onion-location-header.txt
  if (siteConfig.onionDomain) {
    response.headers.set("Onion-Location", `${siteConfig.onionDomain}${request.nextUrl.pathname}`);
  }

  // debugging 🥛
  response.headers.set("x-got-milk", "2%");

  return response;
}

export const config = {
  // save compute time by skipping middleware for static and metadata files
  matcher: [
    "/((?!_next/static|_next/image|_stream|_vercel|static|.well-known|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest).*)",
  ],
};
