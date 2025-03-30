import clsx from "clsx";
import Link from "../Link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./PageTitle.module.css";

export type PageTitleProps = ComponentPropsWithoutRef<"h1"> & {
  canonical: string;
};

const PageTitle = ({ canonical, className, children, ...rest }: PageTitleProps) => {
  return (
    <h1 className={clsx(styles.title, className)} {...rest}>
      <Link href={canonical} plain className={styles.slug}>
        {children}
      </Link>
    </h1>
  );
};

export default PageTitle;
