import { memo } from "react";
import Link, { CustomLinkProps } from "../Link/Link";
import { styled, darkTheme } from "../../lib/styles/stitches.config";

const FancyColorfulLink = styled(Link, {});

const hex2rgba = (hex: string, alpha = 0.4) => {
  // hex -> rgb, pulled from https://github.com/sindresorhus/hex-rgb/blob/main/index.js#L29
  const number = Number.parseInt(hex.replace(/^#/, ""), 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return `rgba(${red},${green},${blue},${alpha})`;
};

export type ColorfulLinkProps = CustomLinkProps & {
  lightColor: string;
  darkColor: string;
};

const ColorfulLink = ({ lightColor, darkColor, className, ...rest }: ColorfulLinkProps) => {
  return (
    <>
      <FancyColorfulLink
        className={className}
        css={{
          color: lightColor,
          fancyUnderline: { color: hex2rgba(lightColor) },

          [`.${darkTheme} &`]: {
            color: darkColor,
            fancyUnderline: { color: hex2rgba(darkColor) },
          },
        }}
        {...rest}
      />
    </>
  );
};

export default memo(ColorfulLink);
