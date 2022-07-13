import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

// misc. helpers
import hexToRgba from "hex-to-rgba";
import normalizeStyles from "./utils/normalize";

// web fonts
import { Inter, RobotoMono } from "./fonts";

// https://stitches.dev/docs/typescript#type-a-css-object
export type CSS = Stitches.CSS<typeof config>;

export const { styled, css, getCssText, globalCss, keyframes, createTheme, theme, config } = createStitches({
  theme: {
    fonts: {
      sans: `"${Inter.name.regular}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
      sansVar: `"${Inter.name.variable}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
      mono: `"${RobotoMono.name.regular}", ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier`,
      monoVar: `"${RobotoMono.name.variable}", ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier`,
    },

    colors: {
      backgroundInner: "#ffffff",
      backgroundOuter: "#fcfcfc",
      backgroundHeader: hexToRgba("#fcfcfc", 0.7),
      text: "#202020",
      mediumDark: "#515151",
      medium: "#5e5e5e",
      mediumLight: "#757575",
      light: "#d2d2d2",
      kindaLight: "#e3e3e3",
      superLight: "#f4f4f4",
      superDuperLight: "#fbfbfb",
      link: "#0e6dc2",
      linkUnderline: hexToRgba("#0e6dc2", 0.4),
      success: "#44a248",
      error: "#ff1b1b",
      warning: "#f78200",

      // Syntax Highlighting (light) - modified from Monokai Light: https://github.com/mlgill/pygments-style-monokailight
      codeText: "#313131",
      codeBackground: "#fdfdfd",
      codeComment: "#656e77",
      codeKeyword: "#029cb9",
      codeAttribute: "#70a800",
      codeNamespace: "#f92672",
      codeLiteral: "#ae81ff",
      codePunctuation: "#111111",
      codeVariable: "#d88200",
      codeAddition: "#44a248",
      codeDeletion: "#ff1b1b",
    },

    sizes: {
      maxLayoutWidth: "865px",
    },

    borderWidths: {
      // underline height is based on link's font size
      underline: "calc(0.1em + 0.05rem)",
    },

    radii: {
      corner: "0.6rem",
    },

    transitions: {
      // light <-> dark theme fade duration
      fade: "0.25s ease",
      // fancy underline animation
      linkHover: "0.2s ease-in-out",
    },
  },

  media: {
    // most responsive styles will go here:
    medium: "(max-width: 768px)",
    // used rarely only for SUPER narrow windows:
    small: "(max-width: 380px)",
    // ...note: things then COMPLETELY break at 300px. but it's 2022 let's be real.
  },

  utils: {
    setUnderlineVars: ({
      color = "$colors$linkUnderline", // see theme tokens above
      alpha = 0.4,
    }) => ({
      // allow both pre-set rgba stitches variables and hex values
      $$underlineColor: color.startsWith("#") ? hexToRgba(color, alpha) : color,
    }),
  },
});

export const darkTheme = createTheme({
  colors: {
    backgroundInner: "#1e1e1e",
    backgroundOuter: "#252525",
    backgroundHeader: hexToRgba("#252525", 0.85),
    text: "#f1f1f1",
    mediumDark: "#d7d7d7",
    medium: "#b1b1b1",
    mediumLight: "#959595",
    light: "#646464",
    kindaLight: "#535353",
    superLight: "#272727",
    superDuperLight: "#1f1f1f",
    link: "#88c7ff",
    linkUnderline: hexToRgba("#88c7ff", 0.4),
    success: "#78df55",
    error: "#ff5151",
    warning: "#f2b702",

    // Syntax Highlighting (dark) - modified from Dracula: https://github.com/dracula/pygments
    codeText: "#e4e4e4",
    codeBackground: "#212121",
    codeComment: "#929292",
    codeKeyword: "#3b9dd2",
    codeAttribute: "#78df55",
    codeNamespace: "#f95757",
    codeLiteral: "#d588fb",
    codePunctuation: "#cccccc",
    codeVariable: "#fd992a",
    codeAddition: "#78df55",
    codeDeletion: "#ff5151",
  },
});

export const globalStyles = globalCss(
  // @ts-ignore
  normalizeStyles,
  {
    "@font-face": [...Inter.family, ...RobotoMono.family],

    body: {
      fontFamily: theme.fonts.sans,
      backgroundColor: theme.colors.backgroundInner,
      transition: `background ${theme.transitions.fade}`,
    },

    "code, kbd, samp, pre": {
      fontFamily: theme.fonts.mono,
    },

    // variable font support?
    "@supports (font-variation-settings: normal)": {
      body: {
        fontFamily: theme.fonts.sansVar,
        fontOpticalSizing: "auto",
      },

      "code, kbd, samp, pre": {
        fontFamily: theme.fonts.monoVar,
      },

      // Chrome doesn't automatically slant multi-axis Inter var, for some reason.
      // Adding "slnt" -10 fixes Chrome but then over-italicizes in Firefox. AHHHHHHHHHH.
      em: {
        fontStyle: "normal",
        fontVariationSettings: `"ital" 1, "slnt" -10`,

        // Roboto Mono doesn't have this problem, but the above fix breaks it, of course.
        "& code, & kbd, & samp, & pre": {
          fontStyle: "italic !important",
          fontVariationSettings: "initial !important",
        },
      },
    },
  }
);

// theme classnames are generated dynamically by stitches, so have ThemeProvider pull them from there
export const themeClassNames = {
  light: theme.className,
  dark: darkTheme.className,
};

// local storage key
export const themeStorageKey = "theme";

// re-export hashed URLs of the most important variable fonts so we can preload them in pages/_document.tsx
export const preloadFonts = [...Inter.preloadFonts, ...RobotoMono.preloadFonts];
