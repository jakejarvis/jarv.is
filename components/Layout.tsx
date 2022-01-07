import { NextSeo } from "next-seo";

import styles from "./Layout.module.scss";

type Props = {
  title?: string;
  description?: string;
  children: unknown;
};

const Layout = ({ title, description, children }: Props) => (
  <>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
      }}
    />

    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>
  </>
);

export default Layout;
