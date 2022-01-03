import { NextSeo } from "next-seo";

import styles from "./Container.module.scss";

type Props = {
  title?: string;
  description?: string;
  children: unknown;
};

const Container = ({ title, description, children }: Props) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
        }}
      />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Container;
