import * as Inter from "./fonts/inter";
import * as RobotoMono from "./fonts/roboto-mono";
import * as ComicNeue from "./fonts/comic-neue";

// re-export hashed URLs of the most important variable fonts so we can preload them in pages/_document.tsx
export const preloadUrls = [...Inter.preloadUrls, ...RobotoMono.preloadUrls];

// re-export everything for use in ../stitches.config.ts
export { Inter, RobotoMono, ComicNeue };
