import { getImageUrl } from "@/lib/image";

/**
 * An `<img>` served through Vercel's image optimizer at 1x and 2x its rendered `width`. Free of hooks, so it works in
 * server and client components alike.
 */
const Image = ({
  src,
  width,
  height,
  quality,
  priority,
  alt,
  ...rest
}: Omit<React.ComponentProps<"img">, "src" | "width" | "height"> & {
  src: string;
  width: number;
  height?: number;
  quality?: number;
  /** Load eagerly at high priority (for images above the fold). */
  priority?: boolean;
}) => (
  <img
    src={getImageUrl(src, width, quality)}
    srcSet={`${getImageUrl(src, width, quality)} 1x, ${getImageUrl(src, width * 2, quality)} 2x`}
    width={width}
    height={height}
    alt={alt}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : undefined}
    decoding="async"
    {...rest}
  />
);

export { Image };
