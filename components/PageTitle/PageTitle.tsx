"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "../Link";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./PageTitle.module.css";

export type PageTitleProps = ComponentPropsWithoutRef<"h1">;

const PageTitle = ({ className, children, ...rest }: PageTitleProps) => {
  const pathname = usePathname() || "";

  return (
    <h1 className={clsx(styles.title, className)} {...rest}>
      <Link href={pathname} underline={false} className={styles.link}>
        {children}
      </Link>
    </h1>
  );
};

export default PageTitle;
