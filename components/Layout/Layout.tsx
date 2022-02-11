import Head from "next/head";
import Script from "next/script";
import { useTheme } from "next-themes";
import classNames from "classnames";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import themes, { toCSS } from "../../lib/config/themes";

import styles from "./Layout.module.css";

type LayoutProps = JSX.IntrinsicElements["div"] & {
  noContainer?: boolean; // pass true to disable default `<main>` container styles with padding, etc.
};

const Layout = ({ noContainer, className, children, ...rest }: LayoutProps) => {
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

        {/* kinda a hack to prevent dramatically fading into dark theme if we're immediately setting it on load */}
        <style>{`.page.no-fade,.page.no-fade *{transition:none!important}`}</style>

        {/* dynamically set browser theme color to match the background color */}
        <meta name="theme-color" content={themes[resolvedTheme || "light"]["background-outer"]} />
      </Head>

      {/* remove the `.no-fade` class above from body once the page is finished loading */}
      <Script id="unblock-transitions" strategy="lazyOnload">
        {`try{document.body.classList.remove("no-fade")}catch(e){}`}
      </Script>

      <div className={classNames(styles.flex, className)} {...rest}>
        <Header />

        {/* passing `noContainer={true}` to Layout allows 100% control of the content area on a per-page basis */}
        {noContainer ? (
          <>{children}</>
        ) : (
          <main className={styles.default}>
            <div className={styles.container}>{children}</div>
          </main>
        )}

        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export default Layout;
