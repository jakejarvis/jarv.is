import Image from "next/image";

import type { ImageProps } from "next/image";

// TODO: infer ratio when given zero/one dimensions
// TODO: fold figure/figcaption tags into this component

const CustomImg = (props: ImageProps) => {
  return (
    // the required height and width are part of the props, so they get automatically passed here with {...props}
    <div style={{ margin: "1em auto", textAlign: "center" }}>
      <Image
        src={props.src}
        layout="intrinsic"
        width={props.width}
        height={props.height}
        alt={props.alt}
        quality={85}
        loading="lazy"
      />
    </div>
  );
};

export default CustomImg;
