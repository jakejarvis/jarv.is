import clsx from "clsx";
import Header from "../Header";
import Footer from "../Footer";
import { SkipToContentLink, SkipToContentTarget } from "../SkipToContent";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Layout.module.css";

export type LayoutProps = ComponentPropsWithoutRef<"div"> & {
  container?: boolean; // pass false to disable default `<main>` container styles with padding, etc.
};

const Layout = ({ container = true, className, children, ...rest }: LayoutProps) => {
  return (
    <>
      <SkipToContentLink />

      <div className={clsx(styles.flex, className)} {...rest}>
        <Header className={styles.stickyHeader} />

        {/* passing `container={false}` to Layout allows 100% control of the content area on a per-page basis */}
        {container ? (
          <main className={styles.default}>
            <SkipToContentTarget />
            <div className={styles.container}>{children}</div>
          </main>
        ) : (
          <>
            <SkipToContentTarget />
            {children}
          </>
        )}

        <Footer className={styles.flexedFooter} />
      </div>
    </>
  );
};

export default Layout;
