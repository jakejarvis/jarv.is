import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import { baseUrl } from "../../lib/config";
import type { HTMLAttributes } from "react";

import styles from "./PageTitle.module.css";

type Props = HTMLAttributes<HTMLHeadingElement>;

const PageTitle = ({ className, children, ...rest }: Props) => {
  const router = useRouter();
  const canonical = `${baseUrl}${router.pathname}/`;

  return (
    <h1 className={classNames(styles.title, className)} {...rest}>
      <Link href={canonical}>
        <a className={styles.link}>{children}</a>
      </Link>
    </h1>
  );
};

export default PageTitle;
