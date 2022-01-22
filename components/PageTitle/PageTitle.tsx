import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./PageTitle.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

const PageTitle = ({ children, className }: Props) => {
  const router = useRouter();

  return (
    <h1 className={classNames(styles.title, className)}>
      <Link href={router.asPath}>
        <a>{children}</a>
      </Link>
    </h1>
  );
};

export default PageTitle;
