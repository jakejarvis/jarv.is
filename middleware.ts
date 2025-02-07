import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import siteConfig from "./lib/config";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // https://gitweb.torproject.org/tor-browser-spec.git/tree/proposals/100-onion-location-header.txt
  if (siteConfig.onionDomain) {
    response.headers.set("Onion-Location", new URL(request.nextUrl.pathname, siteConfig.onionDomain).href);
  }

  return response;
}
