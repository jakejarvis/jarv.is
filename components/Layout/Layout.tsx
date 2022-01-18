import Head from "next/head";
import { useTheme } from "next-themes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { themeColors } from "../../lib/config";
import type { ReactNode } from "react";

import styles from "./Layout.module.css";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme && (
        <Head>
          <meta name="theme-color" content={themeColors[resolvedTheme]} />
        </Head>
      )}

      <Header />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
