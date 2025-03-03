import clsx from "clsx";
import Header from "../Header";
import Footer from "../Footer";
import { SkipToContentLink, SkipToContentTarget } from "../SkipToContent";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Layout.module.css";

export type LayoutProps = ComponentPropsWithoutRef<"div">;

const Layout = ({ className, children, ...rest }: LayoutProps) => {
  return (
    <>
      <SkipToContentLink />

      <div className={clsx(styles.flex, className)} {...rest}>
        <Header />

        <main className={styles.default}>
          <SkipToContentTarget />
          <div className={styles.container}>{children}</div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
