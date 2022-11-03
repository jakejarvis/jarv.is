import { useRouter } from "next/router";
import Link from "../Link";
import { styled, theme } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Title = styled("h1", {
  marginTop: 0,
  marginBottom: "0.6em",
  fontSize: "2em",
  fontWeight: 600,
  textAlign: "center",

  "@medium": {
    fontSize: "1.8em",
  },
});

const TitleLink = styled(Link, {
  color: theme.colors.text,
});

export type PageTitleProps = ComponentProps<typeof Title>;

const PageTitle = ({ children, ...rest }: PageTitleProps) => {
  const router = useRouter(true);

  return (
    <Title {...rest}>
      <TitleLink href={router.pathname} underline={false}>
        {children}
      </TitleLink>
    </Title>
  );
};

export default PageTitle;
