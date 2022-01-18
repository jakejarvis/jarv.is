import { OctocatOcticon } from "../Icons";

import styles from "./OctocatLink.module.css";

type Props = {
  repo: string;
};

const OctocatLink = (props: Props) => (
  <a className={styles.link} href={`https://github.com/${props.repo}`} target="_blank" rel="noopener noreferrer">
    <OctocatOcticon fill="currentColor" />
  </a>
);

export default OctocatLink;
