import { useRouter } from "next/router";
import NextLink from "next/link";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Title = styled("h1", {
  marginTop: 0,
  marginBottom: "0.6em",
  fontSize: "2em",
  textAlign: "center",

  "@medium": {
    fontSize: "1.8em",
  },
});

const Link = styled(NextLink, {
  color: "$text",
  textDecoration: "none",
});

export type PageTitleProps = ComponentProps<typeof Title>;

const PageTitle = ({ children, ...rest }: PageTitleProps) => {
  const router = useRouter();

  return (
    <Title {...rest}>
      <Link href={router.pathname}>{children}</Link>
    </Title>
  );
};

export default PageTitle;
