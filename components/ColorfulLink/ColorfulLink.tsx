import { memo } from "react";
import Link from "next/link";
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

const ColorfulLink = ({ href, lightColor, darkColor, external, className, ...rest }: Props) => {
  return (
    <>
      <Link href={href} passHref={true} prefetch={false}>
        <a
          className={className}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...rest}
        />
      </Link>

      <style jsx>{`
        a {
          color: ${lightColor};
          background-image: ${getLinearGradient(lightColor)};
        }
        :global([data-theme="dark"]) a {
          color: ${darkColor};
          background-image: ${getLinearGradient(darkColor)};
        }
      `}</style>
    </>
  );
};

export default memo(ColorfulLink);
