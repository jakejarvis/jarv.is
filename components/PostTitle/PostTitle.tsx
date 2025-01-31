import clsx from "clsx";
import Link from "../Link";
import type { ComponentPropsWithoutRef } from "react";
import type { PostFrontMatter } from "../../types";

import styles from "./PostTitle.module.css";

export type PostTitleProps = Pick<PostFrontMatter, "slug" | "title" | "htmlTitle"> & ComponentPropsWithoutRef<"h1">;

const PostTitle = ({ slug, title, htmlTitle, className, ...rest }: PostTitleProps) => {
  return (
    <h1 className={clsx(styles.title, className)} {...rest}>
      <Link
        href={{
          pathname: "/notes/[slug]/",
          query: { slug },
        }}
        dangerouslySetInnerHTML={{ __html: htmlTitle || title }}
        underline={false}
        className={styles.link}
      />
    </h1>
  );
};

export default PostTitle;
