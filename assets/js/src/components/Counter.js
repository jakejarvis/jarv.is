import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetch from "unfetch";

// react components:
import Loading from "./Loading.js";

const Counter = (props) => {
  const [hits, setHits] = useState();

  // start fetching hits from API once slug is set
  useEffect(() => {
    fetch(`/api/hits/?slug=${encodeURIComponent(props.slug)}`)
      .then((response) => response.json())
      .then((data) => setHits(data.hits || 0));
  }, [props.slug]);

  // show spinning loading indicator if data isn't fetched yet
  if (!hits) {
    return <Loading boxes={3} width={20} />;
  }

  // we have data!
  return (
    <span title={`${hits.toLocaleString("en-US")} ${hits === 1 ? "view" : "views"}`}>
      {hits.toLocaleString("en-US")}
    </span>
  );
};

export default Counter;
