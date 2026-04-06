import type { Repository } from "@octokit/graphql-schema";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLinkIcon, GitForkIcon, StarIcon } from "lucide-react";

import { ActivityCalendar } from "@/components/activity-calendar";
import { PageTitle } from "@/components/layout/page-title";
import { RelativeTime } from "@/components/relative-time";
import { Button } from "@/components/ui/button";
import { getContributions, getRepos } from "@/lib/github";
import { createHead } from "@/lib/head";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "jakejarvis";
const numberFormatter = new Intl.NumberFormat("en-US");

export const Route = createFileRoute("/projects")({
  loader: async () => {
    const [contributions, repos] = await Promise.all([getContributions(), getRepos()]);
    return { contributions, repos };
  },
  head: () =>
    createHead({
      title: "Projects",
      description: `Most-starred repositories by @${GITHUB_USERNAME} on GitHub`,
      canonical: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { contributions, repos } = Route.useLoaderData();

  return (
    <>
      <PageTitle canonical="/projects">Projects</PageTitle>

      <h2 className="my-3.5 text-xl font-medium">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary-foreground hover:no-underline"
        >
          Contribution activity
        </a>
      </h2>

      {contributions.length > 0 ? (
        <div className={cn("mx-auto mt-4 mb-8")}>
          <ActivityCalendar data={contributions} noun="contribution" />
        </div>
      ) : (
        <p className="text-muted-foreground my-4 text-center">
          Unable to load contribution data at this time.
        </p>
      )}

      <h2 className="my-3.5 text-xl font-medium">
        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories&sort=stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary-foreground hover:no-underline"
        >
          Popular repositories
        </a>
      </h2>

      {repos && repos.length > 0 ? (
        <div className="row-auto grid w-full grid-cols-none gap-4 md:grid-cols-2">
          {repos.map((repo: Repository) => (
            <div
              key={repo?.name}
              className="border-ring/30 h-fit space-y-1.5 rounded-2xl border px-4 py-3 shadow-xs"
            >
              <a
                href={repo?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-base leading-relaxed font-semibold text-[#0969da] hover:underline dark:text-[#76affa]"
              >
                {repo?.name}
              </a>

              {repo?.description && (
                <p className="text-foreground/85 text-[13px] leading-relaxed">
                  {repo?.description}
                </p>
              )}

              <div className="flex flex-wrap gap-x-4 text-xs leading-loose whitespace-nowrap">
                {repo?.primaryLanguage && (
                  <div className="text-muted-foreground inline-flex flex-nowrap items-center gap-1.5">
                    {repo?.primaryLanguage.color && (
                      <span
                        className="inline-block size-3 rounded-full bg-[var(--language-color)]"
                        style={{
                          ["--language-color" as string]: repo?.primaryLanguage.color,
                        }}
                      />
                    )}
                    <span>{repo?.primaryLanguage.name}</span>
                  </div>
                )}

                {repo?.stargazerCount > 0 && (
                  <a
                    href={`${repo?.url}/stargazers`}
                    title={`${numberFormatter.format(repo?.stargazerCount)} ${repo?.stargazerCount === 1 ? "star" : "stars"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary inline-flex flex-nowrap items-center gap-1.5 hover:no-underline"
                  >
                    <StarIcon className="inline-block size-3.5 shrink-0" aria-hidden="true" />
                    <span>{numberFormatter.format(repo?.stargazerCount)}</span>
                  </a>
                )}

                {repo?.forkCount > 0 && (
                  <a
                    href={`${repo?.url}/network/members`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${numberFormatter.format(repo?.forkCount)} ${repo?.forkCount === 1 ? "fork" : "forks"}`}
                    className="text-muted-foreground hover:text-primary inline-flex flex-nowrap items-center gap-1.5 hover:no-underline"
                  >
                    <GitForkIcon className="inline-block size-3.5 shrink-0" aria-hidden="true" />
                    <span>{numberFormatter.format(repo?.forkCount)}</span>
                  </a>
                )}

                <div className="text-muted-foreground whitespace-nowrap">
                  <span>
                    Updated <RelativeTime date={repo?.pushedAt} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground my-4 text-center">
          Unable to load repository data at this time.
        </p>
      )}

      <p className="mt-6 mb-0 text-center text-base font-medium">
        <Button
          variant="link"
          nativeButton={false}
          render={
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories&type=source&sort=stargazers`}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          View all
          <ExternalLinkIcon className="inline-block size-3.5 shrink-0" aria-hidden="true" />
        </Button>
      </p>
    </>
  );
}
