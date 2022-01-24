import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import styles from "./Selfie.module.css";

import meJpg from "../../public/static/images/me.jpg";

type Props = {
  className?: string;
};

const Selfie = ({ className }: Props) => (
  <Link href="/">
    <a className={classNames(styles.link, className)}>
      <div className={styles.selfie}>
        <Image src={meJpg} alt="Photo of Jake Jarvis" width={70} height={70} quality={60} layout="intrinsic" priority />
      </div>
      <span className={styles.name}>Jake Jarvis</span>
    </a>
  </Link>
);

export default memo(Selfie);
