"use client";

import { env } from "@/lib/env";
import Giscus from "@giscus/react";
import type { GiscusProps } from "@giscus/react";

const Comments = ({ title }: { title: string }) => {
  // fail silently if giscus isn't configured
  if (!env.NEXT_PUBLIC_GISCUS_REPO_ID || !env.NEXT_PUBLIC_GISCUS_CATEGORY_ID) {
    console.warn(
      "[giscus] not configured, ensure 'NEXT_PUBLIC_GISCUS_REPO_ID' and 'NEXT_PUBLIC_GISCUS_CATEGORY_ID' environment variables are set."
    );

    return null;
  }

  return (
    <Giscus
      repo={env.NEXT_PUBLIC_GITHUB_REPO as GiscusProps["repo"]}
      repoId={env.NEXT_PUBLIC_GISCUS_REPO_ID}
      term={title}
      category="Comments"
      categoryId={env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
      mapping="specific"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      loading="lazy"
    />
  );
};

export default Comments;
