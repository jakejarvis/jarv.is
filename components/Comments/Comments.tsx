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

  // TODO: use custom `<Loading />` spinner component during suspense
  return (
    <Wrapper {...rest}>
      <Giscus
        {...(config.giscusConfig as GiscusProps)}
        term={title}
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
