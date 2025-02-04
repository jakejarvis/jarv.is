import commaNumber from "comma-number";
import clsx from "clsx";
import Link from "../Link";
import RelativeTime from "../RelativeTime";
import { GoStar, GoRepoForked } from "react-icons/go";
import type { Project } from "../../types";

import styles from "./RepositoryCard.module.css";

export type RepositoryCardProps = Project & {
  className?: string;
};

const RepositoryCard = ({
  name,
  url,
  description,
  language,
  stars,
  forks,
  updatedAt,
  className,
}: RepositoryCardProps) => {
  return (
    <div className={clsx(styles.card, className)}>
      <Link
        // @ts-ignore
        href={url}
        className={styles.name}
      >
        {name}
      </Link>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.meta}>
        {language && (
          <div className={styles.metaItem}>
            {language.color && <span className={styles.metaLanguage} style={{ backgroundColor: language.color }} />}
            {language.name}
          </div>
        )}

        {stars && stars > 0 && (
          <div className={styles.metaItem}>
            <Link
              // @ts-ignore
              href={`${url}/stargazers`}
              title={`${commaNumber(stars)} ${stars === 1 ? "star" : "stars"}`}
              underline={false}
              className={styles.metaLink}
            >
              <GoStar className={styles.metaIcon} />
              {commaNumber(stars)}
            </Link>
          </div>
        )}

        {forks && forks > 0 && (
          <div className={styles.metaItem}>
            <Link
              // @ts-ignore
              href={`${url}/network/members`}
              title={`${commaNumber(forks)} ${forks === 1 ? "fork" : "forks"}`}
              underline={false}
              className={styles.metaLink}
            >
              <GoRepoForked className={styles.metaIcon} />
              {commaNumber(forks)}
            </Link>
          </div>
        )}

        {/* only use relative "time ago" on client side, since it'll be outdated via SSG and cause hydration errors */}
        <div className={styles.metaItem}>
          <RelativeTime date={updatedAt} verb="Updated" staticFormat="MMM D, YYYY" />
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
