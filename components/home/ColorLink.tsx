import { memo } from "react";
import Link from "next/link";
import css from "styled-jsx/css";
import type { ReactNode } from "react";

type ColorLinkProps = {
  children: ReactNode;
  href: string;
  lightColor: string;
  darkColor: string;
  title?: string;
  external?: boolean;
};

const getFancyLinkStyles = ({ lightColor, darkColor }: Partial<ColorLinkProps>) => {
  // spits out a linear-gradient (that's not realy a gradient) with translucent color in rgba() format
  const linearGradient = (hex: string, alpha = 0.4) => {
    // hex -> rgb, adapted from https://github.com/sindresorhus/hex-rgb/blob/main/index.js
    hex = hex.replace(/^#/, "");
    const number = Number.parseInt(hex, 16);
    const red = number >> 16;
    const green = (number >> 8) & 255;
    const blue = number & 255;

    const rgbaString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    return `linear-gradient(${rgbaString}, ${rgbaString})`;
  };

  return css.resolve`
    a {
      color: ${lightColor};
      background-image: ${linearGradient(lightColor)};
    }
    :global([data-theme="dark"]) a {
      color: ${darkColor};
      background-image: ${linearGradient(darkColor)};
    }
  `;
};

const ColorLink = ({ href, title, lightColor, darkColor, external = false, children }: ColorLinkProps) => {
  const { className, styles } = getFancyLinkStyles({ lightColor, darkColor });

  return (
    <>
      <Link href={href} passHref={true} prefetch={false}>
        <a
          className={className}
          title={title}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      </Link>

      {styles}
    </>
  );
};

export default memo(ColorLink);
