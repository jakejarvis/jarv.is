import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetch from "unfetch";

// react components:
import Loading from "./Loading.js";
import RepositoryCard from "./RepositoryCard.js";

const RepositoryGrid = () => {
  const [repos, setRepos] = useState([]);

  // start fetching repos from API immediately
  useEffect(() => {
    // API endpoint (sort by stars, limit to 12)
    fetch("/api/projects/?top&limit=12")
      .then((response) => response.json())
      .then((data) => setRepos(data || []));
  }, []);

  // show spinning loading indicator if data isn't fetched yet
  if (repos.length === 0) {
    return <Loading boxes={3} width={40} style={{ margin: "0.7em auto" }} />;
  }

  // we have data!
  return (
    <>
      {repos.map((repo) => (
        // eslint-disable-next-line react/jsx-key
        <RepositoryCard {...repo} />
      ))}
    </>
  );
};

export default RepositoryGrid;
