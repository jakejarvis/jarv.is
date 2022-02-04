import Head from "next/head";
import { useTheme } from "next-themes";
import classNames from "classnames";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { themeColors } from "../../lib/config";
import type { PropsWithChildren } from "react";

import styles from "./Layout.module.css";

type Props = PropsWithChildren<{
  noContainer?: boolean; // pass true to disable default `<main>` container styles with padding, etc.
  className?: string;
}>;

const Layout = ({ noContainer, className, children }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme && (
        <Head>
          <meta name="theme-color" content={themeColors[resolvedTheme]} />
        </Head>
      )}

      <Header />

      {noContainer ? (
        <main className={className}>{children}</main>
      ) : (
        <main className={classNames(styles.main, className)}>
          <div className={styles.container}>{children}</div>
        </main>
      )}

      <Footer />
    </>
  );
};

export default Layout;
