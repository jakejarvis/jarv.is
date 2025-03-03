import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import config from "./lib/config";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // https://gitweb.torproject.org/tor-browser-spec.git/tree/proposals/100-onion-location-header.txt
  if (config.onionDomain) {
    response.headers.set("Onion-Location", `${config.onionDomain}${request.nextUrl.pathname}`);
  }

  // debugging 🥛
  response.headers.set("x-got-milk", "2%");

  return response;
}
