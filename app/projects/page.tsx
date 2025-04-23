import { env } from "../../lib/env";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GitForkIcon, StarIcon } from "lucide-react";
import Calendar from "./calendar";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import RelativeTime from "../../components/RelativeTime";
import { createMetadata } from "../../lib/helpers/metadata";
import { getContributions, getRepos } from "./github";

import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "Projects",
  description: `Most-starred repositories by @${env.NEXT_PUBLIC_GITHUB_USERNAME} on GitHub`,
  canonical: "/projects",
});

const Page = async () => {
  // don't fail the entire site build if the required config for this page is missing, just return a 404 since this page
  // would be mostly blank anyways.
  if (!env.GITHUB_TOKEN) {
    console.error("[/projects] I can't fetch anything from GitHub without 'GITHUB_TOKEN' set!");
    notFound();
  }

  // fetch the repos and contributions in parallel
  const [contributions, repos] = await Promise.all([getContributions(), getRepos()]);

  return (
    <>
      <PageTitle canonical="/projects">Projects</PageTitle>

      <h2 className={styles.heading}>
        <Link href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`} style={{ color: "inherit" }} plain>
          Contribution activity
        </Link>
      </h2>

      <Suspense fallback={<p>Failed to generate activity calendar.</p>}>
        <Calendar data={contributions} className={styles.calendar} />
      </Suspense>

      <h2 className={styles.heading}>
        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories&sort=stargazers`}
          style={{ color: "inherit" }}
          plain
        >
          Popular repositories
        </Link>
      </h2>

      <div className={styles.grid}>
        {repos?.map((repo) => (
          <div key={repo!.name} className={styles.card}>
            <Link href={repo!.url} className={styles.name}>
              {repo!.name}
            </Link>

            {repo!.description && <p className={styles.description}>{repo!.description}</p>}

            <div className={styles.meta}>
              {repo!.primaryLanguage && (
                <div className={styles.metaItem}>
                  {repo!.primaryLanguage.color && (
                    <span
                      className={styles.metaIcon}
                      style={{ backgroundColor: repo!.primaryLanguage.color, borderRadius: "50%" }}
                    />
                  )}
                  <span>{repo!.primaryLanguage.name}</span>
                </div>
              )}

              {repo!.stargazerCount > 0 && (
                <div className={styles.metaItem}>
                  <Link
                    href={`${repo!.url}/stargazers`}
                    title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.stargazerCount)} ${repo!.stargazerCount === 1 ? "star" : "stars"}`}
                    plain
                    className={styles.metaLink}
                  >
                    <StarIcon size="1.25em" className={styles.metaIcon} />
                    <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.stargazerCount)}</span>
                  </Link>
                </div>
              )}

              {repo!.forkCount > 0 && (
                <div className={styles.metaItem}>
                  <Link
                    href={`${repo!.url}/network/members`}
                    title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.forkCount)} ${repo!.forkCount === 1 ? "fork" : "forks"}`}
                    plain
                    className={styles.metaLink}
                  >
                    <GitForkIcon size="1.25em" className={styles.metaIcon} />
                    <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.forkCount)}</span>
                  </Link>
                </div>
              )}

              <div className={styles.metaItem}>
                <span
                  className={styles.metaIcon}
                  style={{
                    // invisible icon hack to fix line height
                    width: 0,
                    marginRight: 0,
                  }}
                />
                <span>
                  Updated <RelativeTime date={repo!.pushedAt} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          marginBottom: 0,
          fontWeight: 500,
        }}
      >
        <Link href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`}>
          View more on{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            style={{
              width: "1.2em",
              height: "1.2em",
              verticalAlign: "text-top",
              margin: "0 0.1em 0 0.25em",
              fill: "var(--colors-text)",
            }}
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>{" "}
          GitHub.
        </Link>
      </p>
    </>
  );
};

export default Page;
