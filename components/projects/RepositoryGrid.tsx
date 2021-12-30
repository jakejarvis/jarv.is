import RepositoryCard from "./RepositoryCard";

import styles from "./RepositoryGrid.module.scss";

export default function RepositoryGrid({ repos }) {
  return (
    <>
      <div className={styles.grid}>
        {repos.map((repo) => (
          // eslint-disable-next-line react/jsx-key
          <RepositoryCard key={repo.name} {...repo} />
        ))}
      </div>
      <p className={styles.view_more}>
        <a href="https://github.com/jakejarvis?tab=repositories" target="_blank" rel="noopener noreferrer">
          View more on GitHub...
        </a>
      </p>
    </>
  );
}
