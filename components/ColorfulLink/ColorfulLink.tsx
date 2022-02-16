import { memo } from "react";
import css from "styled-jsx/css";
import classNames from "classnames";
import Link, { CustomLinkProps } from "../Link/Link";

export type ColorfulLinkProps = CustomLinkProps & {
  lightColor: string;
  darkColor: string;
};

// spits out alpha'd version of given color in rgba() format within a linear-gradient (that's not really a gradient)
const getLinearGradient = (hex: string, alpha = 0.4) => {
  // hex -> rgb, pulled from https://github.com/sindresorhus/hex-rgb/blob/main/index.js#L29
  const number = Number.parseInt(hex.replace(/^#/, ""), 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  const rgbaString = `rgba(${red},${green},${blue},${alpha})`;

  return `linear-gradient(${rgbaString},${rgbaString})`;
};

const ColorfulLink = ({ lightColor, darkColor, className, ...rest }: ColorfulLinkProps) => {
  const { className: underlineClassName, styles: underlineStyles } = css.resolve`
    a {
      color: ${lightColor};
      background-image: ${getLinearGradient(lightColor)};
    }
    :global([data-theme="dark"]) a {
      color: ${darkColor};
      background-image: ${getLinearGradient(darkColor)};
    }
  `;

  return (
    <>
      <Link className={classNames(underlineClassName, className)} {...rest} />

      {underlineStyles}
    </>
  );
};

export default memo(ColorfulLink);
