import hexRgb from "hex-rgb";
import isAbsoluteUrl from "is-absolute-url";
import Link from "next/link";

type Props = {
  children: unknown;
  href: string;
  lightColor: string;
  darkColor: string;
  title?: string;
  className?: string;
  external?: boolean;
};

export default function ColorLink({
  children,
  href,
  lightColor,
  darkColor,
  title,
  className,
  external = false,
}: Props) {
  external = external || isAbsoluteUrl(href);

  // spits out an alpha color in rgb() that's compatible with linear-gradient()
  const bgAlpha = (color: string) => hexRgb(color, { alpha: 0.4, format: "css" });

  return (
    <Link href={href} passHref={true} prefetch={false}>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a
        className={className}
        title={title}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        <style jsx>{`
          a {
            color: ${lightColor};
            background-image: linear-gradient(${bgAlpha(lightColor)}, ${bgAlpha(lightColor)});
          }

          :global([data-theme="dark"]) a {
            color: ${darkColor};
            background-image: linear-gradient(${bgAlpha(darkColor)}, ${bgAlpha(darkColor)});
          }
        `}</style>
      </a>
    </Link>
  );
}
