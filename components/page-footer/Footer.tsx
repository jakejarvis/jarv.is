import Link from "next/link";
import HeartIcon from "../icons/svg/heart.svg";
import NextjsIcon from "../icons/svg/nextjs.svg";
import * as config from "../../lib/config";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.copyright}>
          Content{" "}
          <Link href="/license/" prefetch={false}>
            <a title="Creative Commons Attribution 4.0 International">licensed under CC-BY-4.0</a>
          </Link>
          ,{" "}
          <Link href="/previously/" prefetch={false}>
            <a title="Previously on...">2001 –</a>
          </Link>{" "}
          {new Date().getFullYear()}.
        </div>
        <div className={styles.powered_by}>
          Made with{" "}
          <span className={styles.beat}>
            <HeartIcon alt="Love" />
          </span>{" "}
          and{" "}
          <a href="https://nextjs.org/" title="Powered by Next.js" target="_blank" rel="noopener noreferrer">
            <NextjsIcon alt="Next.js" fill="currentColor" />
          </a>
          .{" "}
          <a
            href={`https://github.com/${config.githubRepo}`}
            title="View Source on GitHub"
            className={styles.view_source}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source.
          </a>
        </div>
      </div>
    </footer>
  );
}
