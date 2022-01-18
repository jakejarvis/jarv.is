import { OctocatOcticon } from "../helpers/icons";

type Props = {
  repo: string;
};

const OctocatLink = (props: Props) => (
  <a
    className="no-underline"
    href={`https://github.com/${props.repo}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ margin: "0 0.4em", color: "var(--text)" }}
  >
    <OctocatOcticon fill="currentColor" />
  </a>
);

export default OctocatLink;
