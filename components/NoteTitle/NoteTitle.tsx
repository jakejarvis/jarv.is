import Link from "../Link";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { NoteFrontMatter } from "../../types";

const Title = styled("h1", {
  margin: "0.3em 0 0.5em -1px", // misaligned left margin, super nitpicky
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

const TitleLink = styled(Link, {
  color: "$text",
});

export type NoteTitleProps = Pick<NoteFrontMatter, "slug" | "title" | "htmlTitle"> & ComponentProps<typeof Title>;

const NoteTitle = ({ slug, title, htmlTitle, ...rest }: NoteTitleProps) => {
  return (
    <Title {...rest}>
      <TitleLink
        href={{
          pathname: "/notes/[slug]/",
          query: { slug },
        }}
        dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
        underline={false}
      />
    </Title>
  );
};

export default NoteTitle;
