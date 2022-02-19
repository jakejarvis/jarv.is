import Head from "next/head";
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
          id="theme-colors"
          dangerouslySetInnerHTML={{
            __html: `:root{${toCSS(themes.light)}}[data-theme="dark"]{${toCSS(themes.dark)}}`,
          }}
        />

        {/* dynamically set browser theme color to match the background color; default to light for SSR */}
        <meta name="theme-color" content={themes[resolvedTheme || "light"]["background-outer"]} />
      </Head>

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
