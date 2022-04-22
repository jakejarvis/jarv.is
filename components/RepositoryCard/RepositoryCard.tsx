import Link from "../Link";
import RelativeTime from "../RelativeTime";
import { StarOcticon, ForkOcticon } from "../Icons";
import { commafy } from "../../lib/helpers/format-number";
import { styled } from "../../lib/styles/stitches.config";
import type { RepositoryType } from "../../types";

const Wrapper = styled("div", {
  width: "100%",
  padding: "1.2em 1.2em 0.8em 1.2em",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",
  fontSize: "0.85em",
  color: "$mediumDark",

  // light-dark theme switch fading
  transition: "border 0.25s ease",
});

const Name = styled(Link, {
  fontSize: "1.2em",
  fontWeight: 600,
});

const Description = styled("p", {
  marginTop: "0.7em",
  marginBottom: "0.5em",
  lineHeight: 1.7,
});

const Meta = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
});

const MetaItem = styled("div", {
  marginRight: "1.5em",
  fontSize: "0.875em",
  lineHeight: 2,
  color: "$medium",
});

const MetaLink = styled("a", {
  color: "inherit",
  textDecoration: "none",

  "&:hover": {
    color: "$link",
  },
});

const MetaIcon = styled("svg", {
  width: "16px",
  height: "16px",
  verticalAlign: "text-bottom",
  marginRight: "0.5em",
  fill: "currentColor",
});

const LanguageCircle = styled("span", {
  display: "inline-block",
  position: "relative",
  width: "1.15em",
  height: "1.15em",
  marginRight: "0.5em",
  borderRadius: "50%",
  verticalAlign: "text-top",
});

export type RepositoryCardProps = RepositoryType & {
  className?: string;
};

const RepositoryCard = ({
  name,
  url,
  description,
  language,
  stars,
  forks,
  updatedAt,
  className,
}: RepositoryCardProps) => {
  return (
    <Wrapper className={className}>
      <Name href={url}>{name}</Name>

      {description && <Description>{description}</Description>}

      <Meta>
        {language && (
          <MetaItem>
            <LanguageCircle css={{ backgroundColor: language.color }} />
            <span>{language.name}</span>
          </MetaItem>
        )}

        {stars > 0 && (
          <MetaItem>
            <MetaLink
              href={`${url}/stargazers`}
              title={`${commafy(stars)} ${stars === 1 ? "star" : "stars"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MetaIcon as={StarOcticon} />
              <span>{commafy(stars)}</span>
            </MetaLink>
          </MetaItem>
        )}

        {forks > 0 && (
          <MetaItem>
            <MetaLink
              href={`${url}/network/members`}
              title={`${commafy(forks)} ${forks === 1 ? "fork" : "forks"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MetaIcon as={ForkOcticon} />
              <span>{commafy(forks)}</span>
            </MetaLink>
          </MetaItem>
        )}

        {/* only use relative "time ago" on client side, since it'll be outdated via SSG and cause hydration errors */}
        <MetaItem>
          <RelativeTime date={updatedAt} prefix="Updated" />
        </MetaItem>
      </Meta>
    </Wrapper>
  );
};

export default RepositoryCard;
