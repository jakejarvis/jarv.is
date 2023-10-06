import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

// misc. helpers
import { rgba } from "polished";
import normalizeCss from "stitches-normalize";

// web fonts
import { Inter, SourceCodePro } from "./fonts";

// https://stitches.dev/docs/typescript#type-a-css-object
export type CSS = Stitches.CSS<typeof stitchesConfig>;

export const {
  styled,
  css,
  getCssText,
  globalCss,
  keyframes,
  createTheme,
  theme,
  config: stitchesConfig,
} = createStitches({
  theme: {
    fonts: {
      sans: `${Inter.style.fontFamily}, sans-serif`,
      mono: `${SourceCodePro.style.fontFamily}, monospace`,
    },

    colors: {
      backgroundInner: "#ffffff",
      backgroundOuter: "#fcfcfc",
      backgroundHeader: rgba("#fcfcfc", 0.7),
      text: "#202020",
      mediumDark: "#515151",
      medium: "#5e5e5e",
      mediumLight: "#757575",
      light: "#d2d2d2",
      kindaLight: "#e3e3e3",
      superLight: "#f4f4f4",
      superDuperLight: "#fbfbfb",
      link: "#0e6dc2",
      linkUnderline: rgba("#0e6dc2", 0.4),
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
    // sets locally scoped css variable for both light and dark themes' link hover underlines
    setUnderlineColor: ({
      color,
      alpha = 0.4,
    }: {
      color: string; // hex value or one of theme tokens above in stitches `$colors$token` format
      alpha?: number;
    }) => ({
      // allow both pre-set rgba stitches variables and hex values
      $$underlineColor: color.startsWith("#") ? rgba(color, alpha) : color,
    }),
  },
});

export const darkTheme = createTheme({
  colors: {
    backgroundInner: "#1e1e1e",
    backgroundOuter: "#252525",
    backgroundHeader: rgba("#252525", 0.85),
    text: "#f1f1f1",
    mediumDark: "#d7d7d7",
    medium: "#b1b1b1",
    mediumLight: "#959595",
    light: "#646464",
    kindaLight: "#535353",
    superLight: "#272727",
    superDuperLight: "#1f1f1f",
    link: "#88c7ff",
    linkUnderline: rgba("#88c7ff", 0.4),
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

// @ts-ignore
export const globalStyles = globalCss(
  // @ts-ignore
  ...normalizeCss({
    systemFonts: false,
  }),
  {
    html: {
      fontFamily: theme.fonts.sans,
    },

    body: {
      backgroundColor: theme.colors.backgroundInner,
      transition: `background ${theme.transitions.fade}`,
    },

    "code, kbd, samp, pre": {
      fontFamily: theme.fonts.mono,
    },

    "em, i": {
      // workaround for lack of italicized Inter on Google Fonts, see: https://github.com/google/fonts/issues/2386#issuecomment-691503098
      fontStyle: "oblique 10deg",
      fontVariationSettings: "'slnt' -10",

      "& :where(code, kbd, samp, pre)": {
        // unset workaround for well-behaving fonts
        fontStyle: "italic",
        fontVariationSettings: "initial",
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
