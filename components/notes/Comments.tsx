import { useTheme } from "next-themes";
import { Giscus } from "@giscus/react";
import { giscusConfig } from "../../lib/config";
import type { GiscusProps } from "@giscus/react";

type Props = {
  title: string;
};

const Comments = ({ title }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      id="comments"
      style={{ marginTop: "2em", paddingTop: "1em", borderTop: "2px solid var(--light)", minHeight: "350px" }}
    >
      <Giscus
        {...(giscusConfig as GiscusProps)}
        term={title}
        mapping="specific"
        reactionsEnabled="1"
        emitMetadata="0"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Comments;
