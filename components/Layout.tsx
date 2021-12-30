import Header from "./page-header/Header";
import Footer from "./page-footer/Footer";

import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
