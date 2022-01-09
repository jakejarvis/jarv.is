import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { githubRepo } from "../../lib/config";

type Props = {
  slug: string;
};

const Comments = (props: Props) => {
  const [injected, setInjected] = useState(false);
  const scriptRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // double check that we're ready for the script and it hasn't already been loaded
    if (!scriptRef.current || injected) {
      return;
    }

    // NOTE: utterances script can't be loaded w/ next/script since the iframe appears literally where the script tag is
    const utterances = document.createElement("script");
    utterances.src = "https://utteranc.es/client.js";
    utterances.async = true;
    utterances.defer = true;
    utterances.crossOrigin = "anonymous";

    // https://utteranc.es/
    utterances.setAttribute("repo", githubRepo);
    utterances.setAttribute("issue-term", `notes/${props.slug}`);
    utterances.setAttribute("theme", resolvedTheme === "dark" ? "github-dark" : "github-light");
    utterances.setAttribute("label", "💬 comments");

    // add inside wrapper div (target for iframe)
    scriptRef.current.appendChild(utterances);
    setInjected(true);

    // cleanup
    return () => utterances.remove();
  }, [resolvedTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={scriptRef}
      id="comments"
      style={{ marginTop: "2em", paddingTop: "1em", borderTop: "2px solid var(--light)" }}
    />
  );
};

export default Comments;
