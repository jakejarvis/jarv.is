import Image from "next/image";
import type { ImageProps } from "next/image";
import type { CSSProperties } from "react";

// TODO: infer ratio when given zero/one dimensions
// TODO: fold figure/figcaption tags into this component

type CustomImageProps = ImageProps & {
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
