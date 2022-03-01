import { useRouter } from "next/router";
import NextLink from "next/link";
import { styled } from "../../lib/styles/stitches.config";
import { baseUrl } from "../../lib/config";
import type { ComponentProps } from "react";

const Title = styled("h1", {
  marginTop: 0,
  marginBottom: "0.6em",
  fontSize: "2em",
  textAlign: "center",

  "@mobile": {
    fontSize: "1.8em",
  },
});

const Link = styled("a", {
  color: "$text",
  textDecoration: "none",
});

export type PageTitleProps = ComponentProps<typeof Title>;

const PageTitle = ({ className, children, ...rest }: PageTitleProps) => {
  const router = useRouter();
  const canonical = `${baseUrl}${router.pathname}/`;

  return (
    <Title className={className} {...rest}>
      <NextLink href={canonical} passHref={true}>
        <Link>{children}</Link>
      </NextLink>
    </Title>
  );
};

export default PageTitle;
