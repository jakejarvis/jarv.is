import { ExternalLinkIcon, GitForkIcon, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ActivityCalendar } from "@/components/activity-calendar";
import { PageTitle } from "@/components/layout/page-title";
import { RelativeTime } from "@/components/relative-time";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { getContributions, getRepos } from "./github";

export const metadata = createMetadata({
  title: "Projects",
  description: `Most-starred repositories by @${process.env.NEXT_PUBLIC_GITHUB_USERNAME} on GitHub`,
  canonical: "/projects",
});

const Page = async () => {
  // don't fail the entire site build if the required config for this page is missing, just return a 404 since this page
  // would be mostly blank anyways.
  if (!process.env.GITHUB_TOKEN) {
    console.error(
      "[/projects] I can't fetch anything from GitHub without 'GITHUB_TOKEN' set!",
    );
    notFound();
  }

  // fetch the repos and contributions in parallel
  const [contributions, repos] = await Promise.all([
    getContributions(),
    getRepos(),
  ]);

  return (
    <>
      <PageTitle canonical="/projects">Projects</PageTitle>

      <h2 className="my-3.5 font-medium text-xl">
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary-foreground hover:no-underline"
        >
          Contribution activity
        </a>
      </h2>

      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        {contributions.length > 0 ? (
          <div className={cn("mx-auto mt-4 mb-8")}>
            <ActivityCalendar data={contributions} noun="contribution" />
          </div>
        ) : (
          <p className="my-4 text-center text-muted-foreground">
            Unable to load contribution data at this time.
          </p>
        )}
      </Suspense>

      <h2 className="my-3.5 font-medium text-xl">
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories&sort=stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary-foreground hover:no-underline"
        >
          Popular repositories
        </a>
      </h2>

      {repos && repos.length > 0 ? (
        <div className="row-auto grid w-full grid-cols-none gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <div
              key={repo?.name}
              className="h-fit space-y-1.5 rounded-2xl border-1 border-ring/30 px-4 py-3 shadow-xs"
            >
              <a
                href={repo?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold text-[#0969da] text-base leading-relaxed hover:underline dark:text-[#76affa]"
              >
                {repo?.name}
              </a>

              {repo?.description && (
                <p className="text-[13px] text-foreground/85 leading-relaxed">
                  {repo?.description}
                </p>
              )}

              <div className="flex flex-wrap gap-x-4 whitespace-nowrap text-xs leading-loose">
                {repo?.primaryLanguage && (
                  <div className="inline-flex flex-nowrap items-center gap-1.5 text-muted-foreground">
                    {repo?.primaryLanguage.color && (
                      <span
                        className="inline-block size-3 rounded-full bg-[var(--language-color)]"
                        style={{
                          ["--language-color" as string]:
                            repo?.primaryLanguage.color,
                        }}
                      />
                    )}
                    <span>{repo?.primaryLanguage.name}</span>
                  </div>
                )}

                {repo?.stargazerCount > 0 && (
                  <a
                    href={`${repo?.url}/stargazers`}
                    title={`${Intl.NumberFormat(process.env.NEXT_PUBLIC_SITE_LOCALE).format(repo?.stargazerCount)} ${repo?.stargazerCount === 1 ? "star" : "stars"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-nowrap items-center gap-1.5 text-muted-foreground hover:text-primary hover:no-underline"
                  >
                    <StarIcon
                      className="inline-block size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {Intl.NumberFormat(
                        process.env.NEXT_PUBLIC_SITE_LOCALE,
                      ).format(repo?.stargazerCount)}
                    </span>
                  </a>
                )}

                {repo?.forkCount > 0 && (
                  <a
                    href={`${repo?.url}/network/members`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${Intl.NumberFormat(process.env.NEXT_PUBLIC_SITE_LOCALE).format(repo?.forkCount)} ${repo?.forkCount === 1 ? "fork" : "forks"}`}
                    className="inline-flex flex-nowrap items-center gap-1.5 text-muted-foreground hover:text-primary hover:no-underline"
                  >
                    <GitForkIcon
                      className="inline-block size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {Intl.NumberFormat(
                        process.env.NEXT_PUBLIC_SITE_LOCALE,
                      ).format(repo?.forkCount)}
                    </span>
                  </a>
                )}

                <div className="whitespace-nowrap text-muted-foreground">
                  <Suspense fallback={null}>
                    <span>
                      Updated <RelativeTime date={repo?.pushedAt} />
                    </span>
                  </Suspense>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-4 text-center text-muted-foreground">
          Unable to load repository data at this time.
        </p>
      )}

      <p className="mt-6 mb-0 text-center font-medium text-base">
        <Button variant="link" asChild>
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories&type=source&sort=stargazers`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View all
            <ExternalLinkIcon
              className="inline-block size-3.5 shrink-0"
              aria-hidden="true"
            />
          </a>
        </Button>
      </p>
    </>
  );
};

export default Page;
