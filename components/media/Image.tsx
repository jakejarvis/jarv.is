import Image from "next/image";
import type { ImageProps } from "next/image";
import type { CSSProperties } from "react";

export type CustomImageProps = ImageProps & {
  style?: CSSProperties;
};

const CustomImage = (props: CustomImageProps) => {
  return (
    <div className="image_wrapper" style={props.style}>
      <Image
        src={props.src}
        layout="intrinsic"
        width={props.width}
        height={props.height}
        alt={props.alt}
        quality={65}
        loading={props.priority ? "eager" : "lazy"}
        priority={!!props.priority}
      />
    </div>
  );
};

export default CustomImage;
