import Link from "../Link";
import { OctocatOcticon } from "../Icons";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const GitHubLink = styled(Link, {
  margin: "0 0.4em",
  color: theme.colors.text,

  "&:hover, &:focus-visible": {
    color: theme.colors.link,
  },
});

const Octocat = styled(OctocatOcticon, {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
  fill: "currentColor",
});

export type OctocatLinkProps = Omit<ComponentProps<typeof GitHubLink>, "href"> & {
  repo: string;
};

const OctocatLink = ({ repo, className, ...rest }: OctocatLinkProps) => {
  return (
    <GitHubLink href={`https://github.com/${repo}`} underline={false} {...rest}>
      <Octocat className={className} />
    </GitHubLink>
  );
};

export default OctocatLink;
