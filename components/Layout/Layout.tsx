import Head from "next/head";
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
      {resolvedTheme && (
        <Head>
          <meta name="theme-color" content={themeColors[resolvedTheme]} />
        </Head>
      )}

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
