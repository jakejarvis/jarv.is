import { useRouter } from "next/router";

import styles from "./PageTitle.module.scss";

type Props = {
  title: unknown;
};

export default function PageTitle({ title }: Props) {
  const router = useRouter();

  return (
    <h1 className={styles.title}>
      <a href={router.asPath}>{title}</a>
    </h1>
  );
}
