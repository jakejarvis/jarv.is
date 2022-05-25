import { OctocatOcticon } from "../Icons";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Link = styled("a", {
  margin: "0 0.4em",
  color: "$text",
  textDecoration: "none",

  "&:hover": {
    color: "$link",
  },
});

const Octocat = styled(OctocatOcticon, {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
  fill: "currentColor",
});

export type OctocatLinkProps = ComponentProps<typeof Link> & {
  repo: string;
};

const OctocatLink = ({ repo, className, ...rest }: OctocatLinkProps) => {
  return (
    <Link href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer" {...rest}>
      <Octocat className={className} />
    </Link>
  );
};

export default OctocatLink;
