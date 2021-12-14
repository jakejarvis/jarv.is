import { h, render } from "preact";
import canonicalUrl from "get-canonical-url";

// react components:
import Counter from "./components/Counter.js";

// page must have a div#meta-hits-counter element to continue
if (typeof window !== "undefined" && document.querySelector(".layout-single #meta-hits-counter")) {
  // use <link rel="canonical"> to deduce a consistent identifier for this page
  const canonical = canonicalUrl({
    normalize: true,
    normalizeOptions: {
      removeTrailingSlash: true,
      removeQueryParameters: true,
      stripHash: true,
    },
  });

  // get path and strip beginning and ending forward slash
  const slug = new URL(canonical).pathname.replace(/^\/|\/$/g, "") || "/";

  render(<Counter slug={slug} />, document.querySelector(".layout-single #meta-hits-counter"));
}
