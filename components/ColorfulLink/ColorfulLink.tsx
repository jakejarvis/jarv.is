import { memo } from "react";
import Link from "next/link";
import css from "styled-jsx/css";
import classNames from "classnames";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  lightColor: string;
  darkColor: string;
  title?: string;
  external?: boolean;
  className?: string;
};

// spits out properties for link's color and background-image in a linear-gradient (that's not really a gradient) with
// translucent color in rgba() format.
const getColorProperties = (hex: string, alpha = 0.4) => {
  // hex -> rgb, pulled from https://github.com/sindresorhus/hex-rgb/blob/main/index.js#L29
  const number = Number.parseInt(hex.replace(/^#/, ""), 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  const rgbaString = `rgba(${red},${green},${blue},${alpha})`;

  // prettier-ignore
  return `
color:${hex};
background-image:linear-gradient(${rgbaString},${rgbaString})`.trim();
};

const ColorfulLink = ({ href, lightColor, darkColor, external, className, ...rest }: Props) => {
  // prettier-ignore
  const { className: underlineClassName, styles: underlineStyles } = css.resolve`
a {${getColorProperties(lightColor)}}
:global([data-theme="dark"]) a {${getColorProperties(darkColor)}}`;

  return (
    <>
      <Link href={href} passHref={true} prefetch={false}>
        <a
          className={classNames(underlineClassName, className)}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...rest}
        />
      </Link>

      {underlineStyles}
    </>
  );
};

export default memo(ColorfulLink);
