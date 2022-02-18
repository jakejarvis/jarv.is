import Head from "next/head";
import Script from "next/script";
import { useTheme } from "next-themes";
import classNames from "classnames";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import themes, { toCSS } from "../../lib/config/themes";

import styles from "./Layout.module.css";

export type LayoutProps = JSX.IntrinsicElements["div"] & {
  container?: boolean; // pass false to disable default `<main>` container styles with padding, etc.
  stickyHeader?: boolean; // pass false to override default stickiness of header when scrolling
};

const Layout = ({ container = true, stickyHeader = true, className, children, ...rest }: LayoutProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        {/* convert themes object into inlined css variables */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{${toCSS(themes.light)}}[data-theme="dark"]{${toCSS(themes.dark)}}`,
          }}
        />

        {/* dynamically set browser theme color to match the background color; default to light for SSR */}
        <meta name="theme-color" content={themes[resolvedTheme || "light"]["background-outer"]} />
      </Head>

      {/* this script removes the CSS that blocks transitions (see _document.tsx) once the page is finished loading...
          ...and removes itself after it has done that: */}
      <Script id="unblock-transitions" strategy="lazyOnload">
        {`try{document.getElementById("block-transitions").remove();document.getElementById("unblock-transitions").remove()}catch(e){}`}
      </Script>

      <div className={classNames(styles.flex, className)} {...rest}>
        <Header sticky={stickyHeader} />

        {/* passing `container={false}` to Layout allows 100% control of the content area on a per-page basis */}
        {container ? (
          <main className={styles.default}>
            <div className={styles.container}>{children}</div>
          </main>
        ) : (
          <>{children}</>
        )}

        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export default Layout;
