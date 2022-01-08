import Head from "next/head";
import { useTheme } from "next-themes";
import Header from "./page-header/Header";
import Footer from "./page-footer/Footer";
import { themeColors } from "../lib/config";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
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
