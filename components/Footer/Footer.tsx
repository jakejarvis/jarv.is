import { env } from "../../lib/env";
import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import Link from "../Link";
import * as config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Footer.module.css";

export type FooterProps = ComponentPropsWithoutRef<"footer">;

const Footer = ({ className, ...rest }: FooterProps) => {
  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <div className={styles.row}>
        <div>
          Content{" "}
          <Link href="/license" title={config.license} plain className={styles.link}>
            licensed under {config.licenseAbbr}
          </Link>
          ,{" "}
          <Link href="/previously" title="Previously on..." plain className={styles.link}>
            {config.copyrightYearStart}
          </Link>{" "}
          – {new Date().getUTCFullYear()}.
        </div>

        <div>
          Made with{" "}
          <span className={styles.heart} title="Love">
            <HeartIcon size="1.25em" fill="currentColor" className={styles.icon} />
          </span>{" "}
          and{" "}
          <Link
            href="https://nextjs.org/"
            title="Powered by Next.js"
            aria-label="Next.js"
            plain
            className={styles.link}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.25em"
              width="1.25em"
              className={styles.icon}
            >
              <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
            </svg>
          </Link>
          .{" "}
          <Link
            href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO}`}
            title="View Source on GitHub"
            plain
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
