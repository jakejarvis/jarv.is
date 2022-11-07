import clsx from "clsx";
import Giscus from "@giscus/react";
import useTheme from "../../hooks/useTheme";
import { styled, theme } from "../../lib/styles/stitches.config";
import { giscusConfig } from "../../lib/config";
import type { ComponentProps } from "react";
import type { GiscusProps } from "@giscus/react";

const Wrapper = styled("div", {
  marginTop: "2em",
  paddingTop: "2em",
  borderTop: `2px solid ${theme.colors.light}`,
  minHeight: "360px",
});

export type CommentsProps = ComponentProps<typeof Wrapper> & {
  title: string;
};

const Comments = ({ title, className, ...rest }: CommentsProps) => {
  const { activeTheme } = useTheme();

  // TODO: use custom `<Loading />` spinner component during suspense
  return (
    <Wrapper
      id="comments"
      className={clsx([className, "giscus"])} // https://github.com/giscus/giscus/blob/fa0975c980d91e691e7e4b4f59fd10bec2e20d90/client.ts#L81
      {...rest}
    >
      <Giscus
        {...(giscusConfig as GiscusProps)}
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
