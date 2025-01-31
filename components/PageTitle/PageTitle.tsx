import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "../Link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./PageTitle.module.css";

export type PageTitleProps = ComponentPropsWithoutRef<"h1">;

const PageTitle = ({ className, children, ...rest }: PageTitleProps) => {
  const router = useRouter();

  return (
    <h1 className={clsx(styles.title, className)} {...rest}>
      <Link href={router.pathname} underline={false} className={styles.link}>
        {children}
      </Link>
    </h1>
  );
};

export default PageTitle;
