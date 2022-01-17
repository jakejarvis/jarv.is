import Image from "next/image";
import type { ImageProps } from "next/image";

const CustomImage = ({ src, width, height, alt, quality, priority }: ImageProps) => {
  return (
    <div className="image_wrapper">
      <Image
        src={(src as string).replace(/^\/public/g, "")}
        layout="intrinsic"
        width={width}
        height={height}
        alt={alt || ""}
        quality={quality || 65}
        loading={priority ? "eager" : "lazy"}
        priority={!!priority}
      />
    </div>
  );
};

export default CustomImage;
