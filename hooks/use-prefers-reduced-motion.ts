// SSR-safe reduced motion hook:
// https://www.joshwcomeau.com/react/prefers-reduced-motion/#ssr-safety

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

export const usePrefersReducedMotion = (): boolean => {
  // default to no animations on server-side
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    // this can now be safely set for the first time on the client-side
    setPrefersReducedMotion(!window.matchMedia(QUERY).matches);

    // register a listener for changes
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    const mediaQueryList = window.matchMedia(QUERY);
    mediaQueryList.addEventListener("change", listener);

    // clean up the event listener
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion;
};
