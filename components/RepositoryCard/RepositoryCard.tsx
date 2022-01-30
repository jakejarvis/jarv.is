import classNames from "classnames";
import { intlFormat, formatDistanceToNowStrict } from "date-fns";
import Link from "../Link/Link";
import { StarOcticon, ForkOcticon } from "../Icons";
import type { RepoType } from "../../types";

import styles from "./RepositoryCard.module.css";

type Props = RepoType & {
  className?: string;
};

const RepositoryCard = ({ name, url, description, language, stars, forks, updatedAt, className }: Props) => (
  <div className={classNames(styles.card, className)}>
    <Link className={styles.name} href={url}>
      {name}
    </Link>

    {description && <p className={styles.description}>{description}</p>}

    <div className={styles.meta}>
      {language && (
        <div className={styles.meta_item}>
          <span className={styles.language_color} style={{ backgroundColor: language.color }} />
          <span>{language.name}</span>
        </div>
      )}

      {stars > 0 && (
        <div className={styles.meta_item}>
          <a
            className={styles.meta_link}
            href={`${url}/stargazers`}
            title={`${stars.toLocaleString("en-US")} ${stars === 1 ? "star" : "stars"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StarOcticon fill="currentColor" className={styles.octicon} />
            <span>{stars.toLocaleString("en-US")}</span>
          </a>
        </div>
      )}

      {forks > 0 && (
        <div className={styles.meta_item}>
          <a
            className={styles.meta_link}
            href={`${url}/network/members`}
            title={`${forks.toLocaleString("en-US")} ${forks === 1 ? "fork" : "forks"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ForkOcticon fill="currentColor" className={styles.octicon} />
            <span>{forks.toLocaleString("en-US")}</span>
          </a>
        </div>
      )}

      <div
        className={styles.meta_item}
        title={intlFormat(
          new Date(updatedAt),
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          },
          {
            locale: "en-US",
          }
        )}
      >
        <span>Updated {formatDistanceToNowStrict(new Date(updatedAt), { addSuffix: true })}</span>
      </div>
    </div>
  </div>
);

export default RepositoryCard;
