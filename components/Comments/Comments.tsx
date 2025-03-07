"use client";

import Giscus from "@giscus/react";
import config from "../../lib/config";
import type { GiscusProps } from "@giscus/react";

export type CommentsProps = {
  title: string;
};

const Comments = ({ title }: CommentsProps) => {
  // fail silently if giscus isn't configured
  if (!config.giscusConfig) {
    console.warn(
      "[giscus] not configured, ensure giscusConfig.repoId and giscusConfig.categoryId are set in lib/config/index.js"
    );

    return null;
  }

  // TODO: use custom `<Loading />` spinner component during suspense
  return (
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
      loading="lazy"
    />
  );
};

export default Comments;
