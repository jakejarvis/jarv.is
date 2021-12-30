import Link from "next/link";
import Image from "next/image";

import selfiePic from "../../public/static/images/me.jpg";

import styles from "./Name.module.scss";

export default function Name() {
  return (
    <Link href="/">
      <a className={styles.title}>
        <span className={styles.selfie}>
          <Image
            src={selfiePic}
            alt="Photo of Jake Jarvis"
            width={75}
            height={75}
            quality={60}
            layout="intrinsic"
            priority
          />
        </span>
        <span className={styles.name}>Jake Jarvis</span>
      </a>
    </Link>
  );
}
