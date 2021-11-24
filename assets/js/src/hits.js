import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetch from "cross-fetch";
import canonicalUrl from "get-canonical-url";

// shared react components:
import Loading from "./components/loading.js";

// API endpoint
const HITS_ENDPOINT = "/api/hits/";

const Counter = (props) => {
  const [hits, setHits] = useState();

  useEffect(() => {
    fetch(`${HITS_ENDPOINT}?slug=${encodeURIComponent(props.slug)}`)
      .then((response) => response.json())
      .then((data) => setHits(data.hits || 0));
  }, [props.slug]);

  // spinning loading indicator
  if (!hits) {
    return <Loading boxes={3} width={20} />;
  }

  return (
    <span title={`${hits.toLocaleString("en-US")} ${hits === 1 ? "view" : "views"}`}>
      {hits.toLocaleString("en-US")}
    </span>
  );
};

// don't continue if there isn't a span#meta-hits element on this page
const wrapper = document.querySelector("div#meta-hits-counter");

// page must have both span#meta-hits and canonical URL to enter
if (wrapper) {
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
  const slug = new URL(canonical).pathname.replace(/^\/|\/$/g, "");

  render(<Counter slug={slug} />, wrapper);
}
