import Head from "next/head";
import { useTheme } from "next-themes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { styled, theme, darkTheme } from "../../stitches.config";
import type { ComponentProps } from "react";

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Default = styled("main", {
  width: "100%",
  padding: "1.5em",

  "@mobile": {
    padding: "1.25em",
  },
});

const Container = styled("div", {
  maxWidth: "865px",
  margin: "0 auto",
  display: "block",
});

// footer needs to fill the remaining vertical screen space. doing it here to keep flex stuff together.
const FlexedFooter = styled(Footer, {
  flex: 1,
});

export type LayoutProps = ComponentProps<typeof Flex> & {
  container?: boolean; // pass false to disable default `<main>` container styles with padding, etc.
  stickyHeader?: boolean; // pass false to override default stickiness of header when scrolling
};

const Layout = ({ container = true, stickyHeader = true, className, children, ...rest }: LayoutProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        {/* dynamically set browser theme color to match the background color; default to light for SSR */}
        <meta
          name="theme-color"
          content={
            resolvedTheme === "dark" ? darkTheme.colors.backgroundOuter.value : theme.colors.backgroundOuter.value
          }
        />
      </Head>

      <Flex className={className} {...rest}>
        <Header sticky={stickyHeader} />

        {/* passing `container={false}` to Layout allows 100% control of the content area on a per-page basis */}
        {container ? (
          <Default>
            <Container>{children}</Container>
          </Default>
        ) : (
          <>{children}</>
        )}

        <FlexedFooter />
      </Flex>
    </>
  );
};

export default Layout;
