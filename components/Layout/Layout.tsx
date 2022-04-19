import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import { useTheme } from "../../hooks/use-theme";
import { styled } from "../../lib/styles/stitches.config";
import { themeColors } from "../../lib/styles/helpers/themes";
import type { ComponentProps } from "react";

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Default = styled("main", {
  width: "100%",
  padding: "1.5em",
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

export type LayoutProps = ComponentProps<typeof Flex>;

const Layout = ({ children, ...rest }: LayoutProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        {/* dynamically set browser theme color to match the background color; default to light for SSR */}
        <meta name="theme-color" content={themeColors[resolvedTheme === "dark" ? "dark" : "light"]} />
      </Head>

      <Flex {...rest}>
        <Header />

        <Default>
          <Container>{children}</Container>
        </Default>

        <FlexedFooter />
      </Flex>
    </>
  );
};

export default Layout;
