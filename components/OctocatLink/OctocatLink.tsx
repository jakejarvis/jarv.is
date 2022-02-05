import classNames from "classnames";
import { OctocatOcticon } from "../Icons";
import type { HTMLAttributes } from "react";

import styles from "./OctocatLink.module.css";

type Props = HTMLAttributes<HTMLAnchorElement> & {
  repo: string;
};

const OctocatLink = ({ repo, className, ...rest }: Props) => (
  <a className={styles.link} href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer" {...rest}>
    <OctocatOcticon fill="currentColor" className={classNames(styles.icon, className)} />
  </a>
);

export default OctocatLink;
