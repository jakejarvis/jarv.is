import Head from "next/head";
import Script from "next/script";
import { useTheme } from "next-themes";
import classNames from "classnames";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { themeColors } from "../../lib/config";
import type { PropsWithChildren, HTMLAttributes } from "react";

import styles from "./Layout.module.css";

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    noContainer?: boolean; // pass true to disable default `<main>` container styles with padding, etc.
  }>;

const Layout = ({ noContainer, className, children, ...rest }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        {resolvedTheme && <meta name="theme-color" content={themeColors[resolvedTheme]} />}

        {/* kinda a hack to prevent dramatically fading into dark theme if we're immediately setting it on load */}
        <style>{`.page.loading,.page.loading *{transition:none!important}`}</style>
      </Head>

      {/* remove the `.loading` class above from body once the page is finished loading */}
      <Script id="unblock-transitions" strategy="lazyOnload">
        {`try{const cl=document.body.classList;cl.remove("loading");cl.add("loaded")}catch(e){}`}
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
