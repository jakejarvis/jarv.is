import classNames from "classnames";
import { OctocatOcticon } from "../Icons";

import styles from "./OctocatLink.module.css";

export type OctocatLinkProps = JSX.IntrinsicElements["a"] & {
  repo: string;
};

const OctocatLink = ({ repo, className, ...rest }: OctocatLinkProps) => (
  <a className={styles.link} href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer" {...rest}>
    <OctocatOcticon fill="currentColor" className={classNames(styles.icon, className)} />
  </a>
);

export default OctocatLink;
