import innerText from "react-innertext";
import Image from "../Image";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { PropsWithChildren, ComponentPropsWithoutRef } from "react";

const Wrapper = styled("figure", {
  margin: "1em auto",
  textAlign: "center",
});

const Caption = styled("figcaption", {
  fontSize: "0.9em",
  lineHeight: 1.5,
  color: theme.colors.medium,
  marginTop: "-0.4em",
});

export type FigureProps = Omit<ComponentPropsWithoutRef<typeof Image>, "alt"> &
  PropsWithChildren<{
    alt?: string; // becomes optional -- pulled from plaintext-ified caption if missing
  }>;

const Figure = ({ children, alt, className, ...imageProps }: FigureProps) => {
  return (
    <Wrapper className={className}>
      <Image alt={alt || innerText(children)} {...imageProps} />
      <Caption>{children}</Caption>
    </Wrapper>
  );
};

export default Figure;
