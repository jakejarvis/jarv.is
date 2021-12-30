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

  // hacky hack to form a unique CSS var based on the light hex code, since they need to be set "globally"
  const varName = `Home__${lightColor.replace("#", "")}`;
  const alpha = 0.4;

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
        <style jsx global>{`
          :root {
            --${varName}: ${lightColor};
            --${varName}_alpha: ${hexRgb(lightColor, { alpha: alpha, format: "css" })};
          }
          [data-theme="dark"] {
            --${varName}: ${darkColor};
            --${varName}_alpha: ${hexRgb(darkColor, { alpha: alpha, format: "css" })};
          }
        `}</style>
        <style jsx>{`
          a {
            color: var(--${varName});
            background-image: linear-gradient(var(--${varName}_alpha), var(--${varName}_alpha));
          }
        `}</style>
      </a>
    </Link>
  );
}
