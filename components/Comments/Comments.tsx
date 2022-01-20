import { useTheme } from "next-themes";
import classNames from "classnames";
import { Giscus } from "@giscus/react";
import { giscusConfig } from "../../lib/config";
import type { GiscusProps } from "@giscus/react";

import styles from "./Comments.module.css";

type Props = {
  title: string;
  className?: string;
};

const Comments = ({ title, className }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={classNames(styles.wrapper, className)}>
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
