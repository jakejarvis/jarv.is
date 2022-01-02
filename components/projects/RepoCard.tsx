import { intlFormat, formatDistanceToNowStrict, parseISO } from "date-fns";
import { StarOcticon, ForkOcticon } from "../icons/octicons";

import styles from "./RepoCard.module.scss";

type Props = {
  name: string;
  url: string;
  description?: string;
  language?: {
    name: string;
    color?: string;
  };
  stars?: number;
  forks?: number;
  updatedAt: string;
};

const RepoCard = ({ name, url, description, language, stars, forks, updatedAt }: Props) => (
  <div className={styles.card}>
    <a className={styles.name} href={url} target="_blank" rel="noopener noreferrer">
      {name}
    </a>

    {description && <p className={styles.description}>{description}</p>}

    <div className={styles.meta}>
      {language && (
        <div className={styles.meta_item}>
          <span className={styles.language_color}>
            <style jsx>{`
              span {
                background-color: ${language.color};
              }
            `}</style>
          </span>
          <span>{language.name}</span>
        </div>
      )}

      {stars > 0 && (
        <div className={styles.meta_item}>
          <a
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
          parseISO(updatedAt),
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
        <span>Updated {formatDistanceToNowStrict(parseISO(updatedAt), { addSuffix: true })}</span>
      </div>
    </div>
  </div>
);

export default RepoCard;
