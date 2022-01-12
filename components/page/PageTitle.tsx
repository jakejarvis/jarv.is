import { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./PageTitle.module.css";

type Props = {
  children: ReactNode;
};

const PageTitle = ({ children }: Props) => {
  const router = useRouter();

  return (
    <h1 className={styles.title}>
      <Link href={router.asPath}>
        <a>{children}</a>
      </Link>
    </h1>
  );
};

export default memo(PageTitle);
