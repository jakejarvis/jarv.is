import Link from "../Link";
import Image from "../Image";
import config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Selfie.module.css";

import selfieJpg from "../../public/static/images/selfie.jpg";

export type SelfieProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

const Selfie = ({ ...rest }: SelfieProps) => {
  return (
    <Link href="/" rel="author" title={config.authorName} underline={false} className={styles.link} {...rest}>
      <Image
        src={selfieJpg}
        alt={`Photo of ${config.authorName}`}
        className={styles.circleImage}
        width={70}
        height={70}
        quality={60}
        placeholder="empty"
        inline
        priority
      />
      <span className={styles.name}>{config.authorName}</span>
    </Link>
  );
};

export default Selfie;
