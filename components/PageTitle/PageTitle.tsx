import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import { baseUrl } from "../../lib/config";
import type { PropsWithChildren } from "react";

import styles from "./PageTitle.module.css";

type Props = PropsWithChildren<{
  className?: string;
}>;

const PageTitle = ({ className, ...rest }: Props) => {
  const router = useRouter();
  const canonical = `${baseUrl}${router.pathname}/`;

  return (
    <h1 className={classNames(styles.title, className)}>
      <Link href={canonical}>
        <a className={styles.link} {...rest} />
      </Link>
    </h1>
  );
};

export default PageTitle;
