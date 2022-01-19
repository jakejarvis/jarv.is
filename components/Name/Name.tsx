import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Name.module.css";

import meJpg from "../../public/static/images/me.jpg";

const Name = () => (
  <Link href="/">
    <a className={styles.link}>
      <div className={styles.selfie}>
        <Image src={meJpg} alt="Photo of Jake Jarvis" width={70} height={70} quality={60} layout="intrinsic" priority />
      </div>
      <span className={styles.name}>Jake Jarvis</span>
    </a>
  </Link>
);

export default memo(Name);
