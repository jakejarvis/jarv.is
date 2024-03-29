import Link from "../Link";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentPropsWithoutRef } from "react";
import type { PostFrontMatter } from "../../types";

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

export type PostTitleProps = Pick<PostFrontMatter, "slug" | "title" | "htmlTitle"> &
  ComponentPropsWithoutRef<typeof Title>;

const PostTitle = ({ slug, title, htmlTitle, ...rest }: PostTitleProps) => {
  return (
    <Title {...rest}>
      <Link
        href={{
          pathname: "/notes/[slug]/",
          query: { slug },
        }}
        dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
        underline={false}
        css={{ color: theme.colors.text }}
      />
    </Title>
  );
};

export default PostTitle;
