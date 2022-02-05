import { memo } from "react";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { Giscus } from "@giscus/react";
import { giscusConfig } from "../../lib/config";
import type { PropsWithChildren, HTMLAttributes } from "react";
import type { GiscusProps } from "@giscus/react";

import styles from "./Comments.module.css";

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    title: string;
  }>;

const Comments = ({ title, className, ...rest }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={classNames(styles.wrapper, className)} {...rest}>
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

export default memo(Comments);
