import Image from "./Image";
import innerText from "react-innertext";
import type { ReactNode } from "react";
import type { CustomImageProps } from "./Image";

export type CustomFigureProps = Omit<CustomImageProps, "alt"> & {
  children: ReactNode; // caption (can be in markdown, yay!!!)
  alt?: string; // becomes optional -- pulled from plaintext-ified caption if missing
};

const CustomFigure = ({ children, alt, ...imageProps }: CustomFigureProps) => {
  return (
    <figure>
      <Image alt={alt || innerText(children)} {...imageProps} />
      <figcaption>{children}</figcaption>
    </figure>
  );
};

export default CustomFigure;
