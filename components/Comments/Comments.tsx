import { memo } from "react";
import { Giscus } from "@giscus/react";
import { useTheme } from "../../hooks/use-theme";
import { styled } from "../../lib/styles/stitches.config";
import { giscusConfig } from "../../lib/config";
import type { ComponentProps } from "react";
import type { GiscusProps } from "@giscus/react";

const Wrapper = styled("div", {
  ".giscus": {
    marginTop: "2em",
    paddingTop: "2em",
    borderTop: "2px solid $light",
    minHeight: "350px",
  },
});

export type CommentsProps = ComponentProps<typeof Wrapper> & {
  title: string;
};

const Comments = ({ title, ...rest }: CommentsProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Wrapper {...rest}>
      <Giscus
        {...(giscusConfig as GiscusProps)}
        term={title}
        mapping="specific"
        reactionsEnabled="1"
        emitMetadata="0"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </Wrapper>
  );
};

export default memo(Comments);
