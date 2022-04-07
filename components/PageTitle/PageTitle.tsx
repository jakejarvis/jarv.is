import { useRouter } from "next/router";
import NextLink from "next/link";
import urlJoin from "url-join";
import { styled } from "../../lib/styles/stitches.config";
import { baseUrl } from "../../lib/config";
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

const Link = styled("a", {
  color: "$text",
  textDecoration: "none",
});

export type PageTitleProps = ComponentProps<typeof Title>;

const PageTitle = ({ children, ...rest }: PageTitleProps) => {
  const router = useRouter();
  const canonical = urlJoin(baseUrl, router.pathname, "/");

  return (
    <Title {...rest}>
      <NextLink href={canonical} passHref={true}>
        <Link>{children}</Link>
      </NextLink>
    </Title>
  );
};

export default PageTitle;
