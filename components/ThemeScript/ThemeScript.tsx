import { useMemo } from "react";
import { minify } from "uglify-js";
import { clientScript } from "./client";

export type ThemeScriptProps = {
  themeClassNames: {
    [themeName: string]: string;
  };
  themeStorageKey: string;
};

const ThemeScript = ({ themeClassNames, themeStorageKey }: ThemeScriptProps) => {
  const minified = useMemo(() => {
    // since the client function will end up being injected as a plain dumb string, we need to set dynamic values here:
    const functionString = String(clientScript)
      .replace('"__MEDIA_QUERY__"', `"(prefers-color-scheme: dark)"`)
      .replace('"__STORAGE_KEY__"', `"${themeStorageKey}"`)
      .replace('"__CLASS_NAMES__"', JSON.stringify(themeClassNames));

    // minify the final code, a bit hacky but this is ONLY done at build-time, so uglify-js is never bundled or sent to
    // the browser to execute.
    const result = minify(`(${functionString})()`, {
      toplevel: true,
      compress: {
        negate_iife: false,
      },
      parse: {
        bare_returns: true,
      },
    });

    // fail somewhat silenty
    if (result.error) {
      console.error(result.error);
      return;
    }

    return result.code;
  }, [themeClassNames, themeStorageKey]);

  // the script tag injected manually into `<head>` in _document.tsx to prevent FARTing:
  // https://css-tricks.com/flash-of-inaccurate-color-theme-fart/
  // even though it's the proper method, using next/script with `strategy="beforeInteractive"` still causes flash of
  // white on load. injecting a normal script tag lets us prioritize setting the `<html>` class even more urgently.
  // TODO: using next/script *might* be possible after https://github.com/vercel/next.js/pull/36364 is merged.
  return (
    <script
      key="restore-theme"
      id="restore-theme"
      dangerouslySetInnerHTML={{
        // make it an IIFE:
        __html: `(function(){${minified}})()`,
      }}
    />
  );
};

export default ThemeScript;
