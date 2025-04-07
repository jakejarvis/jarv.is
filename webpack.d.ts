/// <reference types="webpack/module" />

// see nextConfig.webpack in next.config.ts for non-standard "asset/resource" module rules.
// https://webpack.js.org/guides/typescript/#importing-other-assets

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.vtt" {
  const src: string;
  export default src;
}
