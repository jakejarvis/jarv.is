import { ErrorBoundary } from "react-error-boundary";
import Link from "../Link";
import Time from "../Time";
import HitCounter from "../HitCounter";
import PostTitle from "../PostTitle";
import { FiCalendar, FiTag, FiEdit, FiEye } from "react-icons/fi";
import config from "../../lib/config";
import type { Route } from "next";
import type { PostFrontMatter } from "../../types";

import styles from "./PostMeta.module.css";

export type PostMetaProps = Pick<PostFrontMatter, "slug" | "date" | "title" | "htmlTitle" | "tags">;

const PostMeta = ({ slug, date, title, htmlTitle, tags }: PostMetaProps) => {
  return (
    <>
      <div className={styles.meta}>
        <div className={styles.item}>
          <Link
            href={{
              pathname: "/notes/[slug]/" as Route,
              query: { slug },
            }}
            underline={false}
            className={styles.link}
          >
            <FiCalendar className={styles.icon} />
            <Time date={date} format="MMMM D, YYYY" />
          </Link>
        </div>

        {tags && (
          <div className={styles.item}>
            <FiTag className={styles.icon} />
            <span className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} title={tag} className={styles.tag} aria-label={`Tagged with ${tag}`}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        )}

        <div className={styles.item}>
          <Link
            href={`https://github.com/${config.githubRepo}/blob/main/notes/${slug}.mdx`}
            title={`Edit "${title}" on GitHub`}
            underline={false}
            className={styles.link}
          >
            <FiEdit className={styles.icon} />
            <span>Improve This Post</span>
          </Link>
        </div>

        {/* only count hits on production site */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
          <div
            className={styles.item}
            style={{
              // fix potential layout shift when number of hits loads
              minWidth: "7em",
              marginRight: 0,
            }}
          >
            {/* completely hide this block if anything goes wrong on the backend */}
            <ErrorBoundary fallback={null}>
              <FiEye className={styles.icon} />
              <HitCounter slug={`notes/${slug}`} />
            </ErrorBoundary>
          </div>
        )}
      </div>

      <PostTitle {...{ slug, title, htmlTitle }} />
    </>
  );
};

export default PostMeta;
