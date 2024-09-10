import Link from "../Link";
import { SiGithub } from "react-icons/si";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentPropsWithoutRef } from "react";

const Octocat = styled(SiGithub, {
  display: "inline",
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
});

export type OctocatLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  repo: string;
};

const OctocatLink = ({ repo, className, ...rest }: OctocatLinkProps) => {
  return (
    <Link
      href={`https://github.com/${repo}`}
      underline={false}
      css={{
        margin: "0 0.4em",
        color: theme.colors.text,

        "&:hover, &:focus-visible": {
          color: theme.colors.link,
        },
      }}
      {...rest}
    >
      <Octocat className={className} />
    </Link>
  );
};

export default OctocatLink;
