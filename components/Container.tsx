import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import * as config from "../lib/config";

import styles from "./Container.module.scss";

type Props = {
  title?: string;
  description?: string;
  children: unknown;
};

export default function Container({ title, description, children }: Props) {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${config.baseURL}${router.asPath}`}
        openGraph={{
          title: title,
          url: `${config.baseURL}${router.asPath}`,
        }}
      />
      <div className={styles.container}>{children}</div>
    </>
  );
}
