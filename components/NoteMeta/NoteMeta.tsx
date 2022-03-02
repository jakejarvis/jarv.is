import Link from "next/link";
import { format } from "date-fns";
import HitCounter from "../HitCounter/HitCounter";
import NoteTitle from "../NoteTitle/NoteTitle";
import { DateIcon, TagIcon, EditIcon, ViewsIcon } from "../Icons";
import { styled } from "../../lib/styles/stitches.config";
import * as config from "../../lib/config";
import type { NoteType } from "../../types";

const Wrapper = styled("div", {
  display: "inline-flex",
  flexWrap: "wrap",
  fontSize: "0.825em",
  lineHeight: 2.3,
  letterSpacing: "0.04em",
  color: "$medium",
});

const MetaItem = styled("div", {
  display: "inline-flex",
  marginRight: "1.6em",
  whiteSpace: "nowrap",
});

const MetaLink = styled("a", {
  color: "inherit",
  textDecoration: "none",
});

const Icon = styled("svg", {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
  marginRight: "0.6em",
});

const Tag = styled("span", {
  textTransform: "lowercase",
  whiteSpace: "nowrap",
  marginRight: "0.75em",

  "&::before": {
    content: "\\0023", // cosmetically hashtagify tags
    paddingRight: "0.125em",
    color: "$light",
  },

  "&:last-of-type": {
    marginRight: 0,
  },
});

export type NoteMetaProps = Pick<NoteType["frontMatter"], "slug" | "date" | "title" | "htmlTitle" | "tags">;

const NoteMeta = ({ slug, date, title, htmlTitle, tags = [] }: NoteMetaProps) => (
  <>
    <Wrapper>
      <MetaItem>
        <Link
          href={{
            pathname: "/notes/[slug]/",
            query: { slug },
          }}
          passHref={true}
        >
          <MetaLink>
            <span>
              <Icon as={DateIcon} />
            </span>
            <span title={format(new Date(date), "PPppp")}>{format(new Date(date), "MMMM d, yyyy")}</span>
          </MetaLink>
        </Link>
      </MetaItem>

      {tags.length > 0 && (
        <MetaItem
          css={{
            whiteSpace: "normal",
            display: "inline-flex",
            flexWrap: "wrap",
          }}
        >
          <span>
            <Icon as={TagIcon} />
          </span>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </MetaItem>
      )}

      <MetaItem>
        <MetaLink
          href={`https://github.com/${config.githubRepo}/blob/main/notes/${slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          title={`Edit "${title}" on GitHub`}
        >
          <span>
            <Icon as={EditIcon} />
          </span>
          <span>Improve This Post</span>
        </MetaLink>
      </MetaItem>

      {/* only count hits on production site */}
      {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
        <MetaItem
          // fix potential layout shift when number of hits loads
          css={{ minWidth: "7em", marginRight: 0 }}
        >
          <span>
            <Icon as={ViewsIcon} />
          </span>
          <HitCounter slug={`notes/${slug}`} />
        </MetaItem>
      )}
    </Wrapper>

    <NoteTitle slug={slug} htmlTitle={htmlTitle || title} />
  </>
);

export default NoteMeta;
