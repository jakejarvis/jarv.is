import Image from "../Image";
import innerText from "react-innertext";
import type { ReactNode } from "react";
import type { ImageProps as NextImageProps } from "next/image";

type Props = Omit<NextImageProps, "alt"> & {
  children: ReactNode; // caption (can be in markdown, yay!!!)
  alt?: string; // becomes optional -- pulled from plaintext-ified caption if missing
};

const Figure = ({ children, alt, ...imageProps }: Props) => {
  return (
    <figure>
      <Image alt={alt || innerText(children)} {...imageProps} />
      <figcaption>{children}</figcaption>
    </figure>
  );
};

export default Figure;
