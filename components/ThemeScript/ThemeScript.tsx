import { useMemo } from "react";
import { minify } from "uglify-js";
import { clientScript } from "./client";
import { IS_DEV_SERVER } from "../../lib/config/constants";

export type ThemeScriptProps = JSX.IntrinsicElements["script"] & {
  themeClassNames: {
    [themeName: string]: string;
  };
  themeStorageKey: string;
};

const ThemeScript = ({ key, themeClassNames, themeStorageKey, ...rest }: ThemeScriptProps) => {
  const minified = useMemo(() => {
    // since the client function will end up being injected as a plain dumb string, we need to set dynamic values here:
    const functionString = String(clientScript)
      .replace('"__MEDIA_QUERY__"', `"(prefers-color-scheme: dark)"`)
      .replace('"__STORAGE_KEY__"', `"${themeStorageKey}"`)
      .replace('"__CLASS_NAMES__"', JSON.stringify(themeClassNames));

    // turn the raw function into an iife
    const unminified = `(${functionString})()`;

    // skip minification if running locally to save a few ms
    if (IS_DEV_SERVER) {
      return unminified;
    }

    // minify the final code, a bit hacky but this is ONLY done at build-time, so uglify-js is never bundled or sent to
    // the browser to execute.
    const minified = minify(unminified, {
      toplevel: true,
      compress: {
        negate_iife: false,
      },
      parse: {
        bare_returns: true,
      },
    });

    // fail somewhat silenty by returning the unminified version
    if (!minified || minified.error) {
      console.warn("Failed to minify inline theme script:", minified.error);
      return unminified;
    }

    return minified.code;
  }, [themeClassNames, themeStorageKey]);

  // the script tag injected manually into `<head>` in _document.tsx to prevent FARTing:
  // https://css-tricks.com/flash-of-inaccurate-color-theme-fart/
  // even though it's the proper method, using next/script with `strategy="beforeInteractive"` still causes flash of
  // white on load. injecting a normal script tag lets us prioritize setting the `<html>` class even more urgently.
  // TODO: using next/script *might* be possible after https://github.com/vercel/next.js/pull/36364 is merged.
  return (
    <script
      key={key} // separate on purpose!
      {...rest}
      dangerouslySetInnerHTML={{
        // make it an IIFE:
        __html: `(function(){${minified}})()`,
      }}
    />
  );
};

export default ThemeScript;
