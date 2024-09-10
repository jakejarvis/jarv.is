import { ErrorBoundary } from "react-error-boundary";
import Link from "../Link";
import Time from "../Time";
import HitCounter from "../HitCounter";
import PostTitle from "../PostTitle";
import { FiCalendar, FiTag, FiEdit, FiEye } from "react-icons/fi";
import { styled, theme } from "../../lib/styles/stitches.config";
import config from "../../lib/config";
import type { PostFrontMatter } from "../../types";

const Wrapper = styled("div", {
  display: "inline-flex",
  flexWrap: "wrap",
  fontSize: "0.825em",
  lineHeight: 2.3,
  letterSpacing: "0.04em",
  color: theme.colors.medium,
});

const MetaItem = styled("div", {
  marginRight: "1.6em",
  whiteSpace: "nowrap",
});

const MetaLink = styled(Link, {
  color: "inherit",
});

const Icon = styled("svg", {
  display: "inline",
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
  marginRight: "0.6em",
});

const TagsList = styled("span", {
  whiteSpace: "normal",
  display: "inline-flex",
  flexWrap: "wrap",
});

const Tag = styled("span", {
  textTransform: "lowercase",
  whiteSpace: "nowrap",
  marginRight: "0.75em",

  "&::before": {
    content: "\\0023", // cosmetically hashtagify tags
    paddingRight: "0.125em",
    color: theme.colors.light,
  },

  "&:last-of-type": {
    marginRight: 0,
  },
});

export type PostMetaProps = Pick<PostFrontMatter, "slug" | "date" | "title" | "htmlTitle" | "tags">;

const PostMeta = ({ slug, date, title, htmlTitle, tags }: PostMetaProps) => {
  return (
    <>
      <Wrapper>
        <MetaItem>
          <MetaLink
            href={{
              pathname: "/notes/[slug]/",
              query: { slug },
            }}
            underline={false}
          >
            <Icon as={FiCalendar} />
            <Time date={date} format="MMMM D, YYYY" />
          </MetaLink>
        </MetaItem>

        {tags && (
          <MetaItem>
            <Icon as={FiTag} />
            <TagsList>
              {tags.map((tag) => (
                <Tag key={tag} title={tag} aria-label={`Tagged with ${tag}`}>
                  {tag}
                </Tag>
              ))}
            </TagsList>
          </MetaItem>
        )}

        <MetaItem>
          <MetaLink
            href={`https://github.com/${config.githubRepo}/blob/main/notes/${slug}.mdx`}
            title={`Edit "${title}" on GitHub`}
            underline={false}
          >
            <Icon as={FiEdit} />
            <span>Improve This Post</span>
          </MetaLink>
        </MetaItem>

        {/* only count hits on production site */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
          <MetaItem
            css={{
              // fix potential layout shift when number of hits loads
              minWidth: "7em",
              marginRight: 0,
            }}
          >
            {/* completely hide this block if anything goes wrong on the backend */}
            <ErrorBoundary fallback={null}>
              <Icon as={FiEye} />
              <HitCounter slug={`notes/${slug}`} />
            </ErrorBoundary>
          </MetaItem>
        )}
      </Wrapper>

      <PostTitle {...{ slug, title, htmlTitle }} />
    </>
  );
};

export default PostMeta;
