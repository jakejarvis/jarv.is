import Header from "./page-header/Header";
import Footer from "./page-footer/Footer";

import styles from "./Layout.module.css";

const Layout = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>
    <Footer />
  </>
);

export default Layout;
