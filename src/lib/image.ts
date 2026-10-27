/** Widths allowed by Vercel's image optimizer (must match `images.sizes` in vite.config.ts). */
const IMAGE_SIZES = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
] as const;

/**
 * Returns a URL for `src` resized to (at least) `width` by Vercel's image optimization API, or `src` itself where
 * that API doesn't exist (anywhere but a Vercel deployment).
 */
export const getImageUrl = (src: string, width: number, quality = 75): string => {
  if (!import.meta.env.VITE_VERCEL_IMAGES) return src;

  const snappedWidth = IMAGE_SIZES.find((size) => size >= width) ?? IMAGE_SIZES.at(-1);
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${snappedWidth}&q=${quality}`;
};
