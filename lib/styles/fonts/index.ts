// a weird system but makes it impossible to accidentally end up with multiple imports of the same font. see:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts

export { default as Inter } from "./loaders/Inter";
export { default as SourceCodePro } from "./loaders/SourceCodePro";
export { default as ComicNeue } from "./loaders/ComicNeue";
