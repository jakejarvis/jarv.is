import NextLink from "next/link";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { NoteType } from "../../types";

const Title = styled("h1", {
  margin: "0.3em 0 0.5em -0.03em",
  fontSize: "2.1em",
  lineHeight: 1.3,
  fontWeight: 700,

  "& code": {
    margin: "0 0.075em",
  },

  "@medium": {
    fontSize: "1.8em",
  },
});

const Link = styled("a", {
  color: "$text",
  textDecoration: "none",
});

export type NoteTitleProps = Pick<NoteType["frontMatter"], "slug" | "htmlTitle"> & ComponentProps<typeof Title>;

const NoteTitle = ({ slug, htmlTitle, ...rest }: NoteTitleProps) => (
  <Title {...rest}>
    <NextLink
      href={{
        pathname: "/notes/[slug]/",
        query: { slug },
      }}
      passHref={true}
    >
      <Link dangerouslySetInnerHTML={{ __html: htmlTitle }} />
    </NextLink>
  </Title>
);

export default NoteTitle;
