import fetch from "cross-fetch";
import { h, render, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import dayjs from "dayjs";
import dayjsLocalizedFormat from "dayjs/plugin/localizedFormat.js";
import dayjsRelativeTime from "dayjs/plugin/relativeTime.js";
import { parse as parseEmoji } from "imagemoji";

// API endpoint (sort by stars, limit to 12)
const PROJECTS_ENDPOINT = "/api/projects/?top&limit=12";

// TODO: extract this out to a common element for use on other pages
const Loading = () => (
  <div id="loading-spinner" class="loading">
    <div />
    <div />
    <div />
  </div>
);

const Card = (repo) => (
  <div class="github-card">
    <a class="repo-name" href={repo.url} target="_blank" rel="noopener noreferrer">
      {repo.name}
    </a>

    {repo.description ? (
      <p
        class="repo-description"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parseEmoji(repo.description, (icon) => `/assets/emoji/${icon}.svg`) }}
      />
    ) : null}

    <div class="repo-meta">
      {repo.language ? (
        <div class="repo-meta-item">
          <span class="repo-language-color" style={{ "background-color": repo.language.color }} />
          <span>{repo.language.name}</span>
        </div>
      ) : null}

      {repo.stars > 0 ? (
        <div
          class="repo-meta-item"
          title={`${repo.stars.toLocaleString("en-US")} ${repo.stars === 1 ? "star" : "stars"}`}
        >
          <svg viewBox="0 0 16 16" height="16" width="16">
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            />
          </svg>
          <span>{repo.stars.toLocaleString("en-US")}</span>
        </div>
      ) : null}

      {repo.forks > 0 ? (
        <div
          class="repo-meta-item"
          title={`${repo.forks.toLocaleString("en-US")} ${repo.forks === 1 ? "fork" : "forks"}`}
        >
          <svg viewBox="0 0 16 16" height="16" width="16">
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            />
          </svg>
          <span>{repo.forks.toLocaleString("en-US")}</span>
        </div>
      ) : null}

      <div class="repo-meta-item" title={dayjs(repo.updatedAt).format("lll Z")}>
        <span>Updated {dayjs(repo.updatedAt).fromNow()}</span>
      </div>
    </div>
  </div>
);

const Grid = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(PROJECTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setRepos(data || []);
      });
  }, []);

  // spinning loading indicator
  if (repos.length === 0) {
    return <Loading />;
  }

  return (
    <Fragment>
      {repos.map((repo) => (
        // eslint-disable-next-line react/jsx-key
        <Card {...repo} />
      ))}
    </Fragment>
  );
};

const wrapper = document.querySelector("div#github-cards");

if (wrapper) {
  dayjs.extend(dayjsLocalizedFormat);
  dayjs.extend(dayjsRelativeTime);

  render(<Grid />, wrapper);
}
