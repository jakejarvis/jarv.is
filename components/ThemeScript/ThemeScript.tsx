import { memo } from "react";
import { minify } from "uglify-js";
import type { MinifyOutput } from "uglify-js";

import { restoreTheme as clientFn } from "./client.js";

export type ThemeScriptProps = {
  themeClassNames: {
    [themeName: string]: string;
  };
  themeStorageKey: string;
};

// eslint-disable-next-line react/display-name
const ThemeScript = memo<ThemeScriptProps>(({ themeClassNames, themeStorageKey }) => {
  const minified = (() => {
    // since the client function will end up being injected as a static hard-coded string, we need to determine all of
    // the dynamic values within it *before* generating the final script.
    const source = String(clientFn)
      .replaceAll("__MEDIA_QUERY__", "(prefers-color-scheme: dark)")
      .replaceAll("__STORAGE_KEY__", themeStorageKey)
      .replaceAll("__CLASS_NAMES__", Object.values(themeClassNames).join('","'));

    // turn the raw function into an iife
    const unminified = `(${source})()`;

    // minify the final code. this approach is a bit janky but is ONLY used at build time, so there's essentially no
    // risk of breaking the entire site and/or accidentally bundling uglify-js clientside (bad).
    let minified: MinifyOutput | undefined;
    try {
      minified = minify(unminified, {
        toplevel: true,
        compress: {
          negate_iife: false,
        },
        parse: {
          bare_returns: true,
        },
      });
    } catch (error) {
      // fail somewhat silenty by returning the unminified version
      console.warn("Failed to minify inline theme script:", error);
      return unminified;
    }

    // same as the catch block above, but in some cases (not really sure when), minify() doesn't throw an actual error
    // and instead just returns undefined and an "error" string, so we need to check for both.
    if (!minified || minified.error) {
      console.warn("Failed to minify inline theme script. uglify-js output:", minified.error);
      return unminified;
    }

    return minified.code;
  })();

  // the script tag injected manually into `<head>` in _document.tsx to prevent FARTing:
  // https://css-tricks.com/flash-of-inaccurate-color-theme-fart/
  // even though it's the proper method, using next/script with `strategy="beforeInteractive"` still causes flash of
  // white on load. injecting a normal script tag lets us prioritize setting the `<html>` class even more urgently.
  // TODO: using next/script *might* be possible after https://github.com/vercel/next.js/pull/36364 is merged.
  return (
    <script
      id="restore-theme"
      dangerouslySetInnerHTML={{
        // make it an IIFE:
        __html: `(function(){${minified}})()`,
      }}
    />
  );
});

export default ThemeScript;
