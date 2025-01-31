import Giscus from "@giscus/react";
import clsx from "clsx";
import useTheme from "../../hooks/useTheme";
import config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";
import type { GiscusProps } from "@giscus/react";

import styles from "./Comments.module.css";

export type CommentsProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
};

const Comments = ({ title, className, ...rest }: CommentsProps) => {
  const { activeTheme } = useTheme();

  // fail silently if giscus isn't configured
  if (!config.giscusConfig) {
    console.warn("Giscus isn't configured in lib/config/index.js.");
    return null;
  }

  // TODO: use custom `<Loading />` spinner component during suspense
  return (
    <div className={clsx(styles.comments, className)} {...rest}>
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
    </div>
  );
};

export default Comments;
