import { h, render, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetch from "cross-fetch";
import dayjs from "dayjs";
import dayjsLocalizedFormat from "dayjs/plugin/localizedFormat.js";
import dayjsRelativeTime from "dayjs/plugin/relativeTime.js";
import { parse as parseEmoji } from "imagemoji";

// shared react components:
import { StarIcon, RepoForkedIcon } from "@primer/octicons-react";
import Loading from "./components/loading.js";

// API endpoint (sort by stars, limit to 12)
const PROJECTS_ENDPOINT = "/api/projects/?top&limit=12";

const RepositoryGrid = () => {
  const [repos, setRepos] = useState([]);

  // start fetching repos from API immediately
  useEffect(() => {
    fetch(PROJECTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setRepos(data || []));
  }, []);

  // show spinning loading indicator if data isn't fetched yet
  if (repos.length === 0) {
    return <Loading boxes={3} width={40} style={{ margin: "0.7em auto" }} />;
  }

  // we have data!
  return (
    <Fragment>
      {repos.map((repo) => (
        // eslint-disable-next-line react/jsx-key
        <RepositoryCard {...repo} />
      ))}
    </Fragment>
  );
};

const RepositoryCard = (repo) => (
  <div class="github-card">
    <a class="repo-name" href={repo.url} target="_blank" rel="noopener noreferrer">
      {repo.name}
    </a>

    {repo.description && (
      <p
        class="repo-description"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parseEmoji(repo.description, (icon) => `/assets/emoji/${icon}.svg`) }}
      />
    )}

    <div class="repo-meta">
      {repo.language && (
        <div class="repo-meta-item">
          <span class="repo-language-color" style={{ "background-color": repo.language.color }} />
          <span>{repo.language.name}</span>
        </div>
      )}

      {repo.stars > 0 && (
        <div
          class="repo-meta-item"
          title={`${repo.stars.toLocaleString("en-US")} ${repo.stars === 1 ? "star" : "stars"}`}
        >
          <StarIcon size={16} fill="currentColor" />
          <span>{repo.stars.toLocaleString("en-US")}</span>
        </div>
      )}

      {repo.forks > 0 && (
        <div
          class="repo-meta-item"
          title={`${repo.forks.toLocaleString("en-US")} ${repo.forks === 1 ? "fork" : "forks"}`}
        >
          <RepoForkedIcon size={16} fill="currentColor" />
          <span>{repo.forks.toLocaleString("en-US")}</span>
        </div>
      )}

      <div class="repo-meta-item" title={dayjs(repo.updatedAt).format("lll Z")}>
        <span>Updated {dayjs(repo.updatedAt).fromNow()}</span>
      </div>
    </div>
  </div>
);

// detect if these cards are wanted on this page (only /projects)
const wrapper = document.querySelector("div#github-cards");

if (typeof window !== "undefined" && wrapper) {
  // dayjs plugins: https://day.js.org/docs/en/plugin/loading-into-nodejs
  dayjs.extend(dayjsLocalizedFormat);
  dayjs.extend(dayjsRelativeTime);

  render(<RepositoryGrid />, wrapper);
}
