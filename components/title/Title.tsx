import { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./Title.module.css";

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  const router = useRouter();

  return (
    <h1 className={styles.title}>
      <Link href={router.asPath}>
        <a>{children}</a>
      </Link>
    </h1>
  );
};

export default memo(Title);
