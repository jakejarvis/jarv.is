import { useTheme } from "next-themes";
import { Giscus } from "@giscus/react";
import { giscusConfig } from "../../lib/config";
import type { GiscusProps } from "@giscus/react";

import styles from "./Comments.module.css";

type Props = {
  title: string;
};

const Comments = ({ title }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={styles.wrapper}>
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
