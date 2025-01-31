import Link from "../Link";
import { SiGithub } from "react-icons/si";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./OctocatLink.module.css";
import clsx from "clsx";

export type OctocatLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  repo: string;
};

const OctocatLink = ({ repo, className, ...rest }: OctocatLinkProps) => {
  return (
    <Link href={`https://github.com/${repo}`} underline={false} className={styles.octocatLink} {...rest}>
      <SiGithub className={clsx(styles.octocat, className)} />
    </Link>
  );
};

export default OctocatLink;
