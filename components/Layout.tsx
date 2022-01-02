import Header from "./page-header/Header";
import Footer from "./page-footer/Footer";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default Layout;
