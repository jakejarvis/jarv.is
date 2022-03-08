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
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      // support deprecated listener API
      mediaQueryList.addListener(listener);
    }

    // clean up the event listener
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion;
};
