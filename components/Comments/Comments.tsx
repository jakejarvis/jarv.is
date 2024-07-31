import Giscus from "@giscus/react";
import useTheme from "../../hooks/useTheme";
import { styled, theme } from "../../lib/styles/stitches.config";
import config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";
import type { GiscusProps } from "@giscus/react";

const Wrapper = styled("div", {
  marginTop: "2em",
  paddingTop: "2em",
  borderTop: `2px solid ${theme.colors.light}`,
  minHeight: "360px",
});

export type CommentsProps = ComponentPropsWithoutRef<typeof Wrapper> & {
  title: string;
};

const Comments = ({ title, ...rest }: CommentsProps) => {
  const { activeTheme } = useTheme();

  // fail silently if giscus isn't configured
  if (!config.giscusConfig) {
    console.warn("Giscus isn't configured in lib/config/index.js.");
    return null;
  }

  // TODO: use custom `<Loading />` spinner component during suspense
  return (
    <Wrapper {...rest}>
      <Giscus
        repo={config.githubRepo as GiscusProps["repo"]}
        repoId={config.giscusConfig.repoId}
        term={title}
        category="Comments"
        categoryId={config.giscusConfig.categoryId}
        mapping="specific"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        loading="eager" // still lazily loaded with react-intersection-observer
        theme={activeTheme === "dark" ? activeTheme : "light"}
      />
    </Wrapper>
  );
};

export default Comments;
