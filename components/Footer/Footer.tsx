import clsx from "clsx";
import Link from "../Link";
import { GoHeartFill } from "react-icons/go";
import { SiNextdotjs } from "react-icons/si";
import config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Footer.module.css";

export type FooterProps = ComponentPropsWithoutRef<"footer">;

const Footer = ({ className, ...rest }: FooterProps) => {
  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <div className={styles.row}>
        <div>
          Content{" "}
          <Link href="/license" title={config.license} underline={false} className={styles.link}>
            licensed under {config.licenseAbbr}
          </Link>
          ,{" "}
          <Link href="/previously" title="Previously on..." underline={false} className={styles.link}>
            {config.copyrightYearStart}
          </Link>{" "}
          – {new Date(process.env.RELEASE_DATE || Date.now()).getUTCFullYear()}.
        </div>

        <div>
          Made with{" "}
          <span className={styles.heart} title="Love">
            <GoHeartFill className={styles.icon} style={{ strokeWidth: 2 }} />
          </span>{" "}
          and{" "}
          <Link
            href="https://nextjs.org/"
            title="Powered by Next.js"
            aria-label="Next.js"
            underline={false}
            className={clsx(styles.link, styles.hover)}
          >
            <SiNextdotjs className={styles.icon} />
          </Link>
          .{" "}
          <Link
            href={`https://github.com/${config.githubRepo}`}
            title="View Source on GitHub"
            underline={false}
            className={clsx(styles.link, styles.underline)}
          >
            View source.
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
