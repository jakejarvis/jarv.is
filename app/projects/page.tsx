import { env } from "@/lib/env";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GitForkIcon, StarIcon } from "lucide-react";
import Skeleton from "@/components/ui/skeleton";
import PageTitle from "@/components/layout/page-title";
import Link from "@/components/link";
import RelativeTime from "@/components/relative-time";
import ActivityCalendar from "@/components/activity-calendar";
import { GitHubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";
import { getContributions, getRepos } from "./github";
import Button from "@/components/ui/button";

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

      <h2 className="my-3.5 text-xl font-medium">
        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`}
          className="text-secondary-foreground hover:no-underline"
        >
          Contribution activity
        </Link>
      </h2>

      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        {contributions.length > 0 ? (
          <div className={cn("mx-auto mt-4 mb-8")}>
            <ActivityCalendar data={contributions} noun="contribution" />
          </div>
        ) : (
          <p className="text-muted-foreground my-4 text-center">Unable to load contribution data at this time.</p>
        )}
      </Suspense>

      <h2 className="my-3.5 text-xl font-medium">
        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories&sort=stargazers`}
          className="text-secondary-foreground hover:no-underline"
        >
          Popular repositories
        </Link>
      </h2>

      {repos && repos.length > 0 ? (
        <div className="row-auto grid w-full grid-cols-none gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <div key={repo!.name} className="border-ring/30 h-fit space-y-1.5 rounded-2xl border-1 px-4 py-3 shadow-xs">
              <Link href={repo!.url} className="inline-block text-base leading-relaxed font-semibold">
                {repo!.name}
              </Link>

              {repo!.description && <p className="text-foreground/85 text-sm leading-relaxed">{repo!.description}</p>}

              <div className="flex flex-wrap gap-x-4 text-[0.825rem] leading-loose whitespace-nowrap">
                {repo!.primaryLanguage && (
                  <div className="text-muted-foreground inline-flex flex-nowrap items-center gap-2">
                    {repo!.primaryLanguage.color && (
                      <span
                        className="inline-block size-4 rounded-full bg-[var(--language-color)]"
                        style={{ ["--language-color" as string]: repo!.primaryLanguage.color }}
                      />
                    )}
                    <span>{repo!.primaryLanguage.name}</span>
                  </div>
                )}

                {repo!.stargazerCount > 0 && (
                  <Link
                    href={`${repo!.url}/stargazers`}
                    title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.stargazerCount)} ${repo!.stargazerCount === 1 ? "star" : "stars"}`}
                    className="text-muted-foreground hover:text-primary inline-flex flex-nowrap items-center gap-2 hover:no-underline"
                  >
                    <StarIcon className="inline-block size-4 shrink-0" />
                    <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.stargazerCount)}</span>
                  </Link>
                )}

                {repo!.forkCount > 0 && (
                  <Link
                    href={`${repo!.url}/network/members`}
                    title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.forkCount)} ${repo!.forkCount === 1 ? "fork" : "forks"}`}
                    className="text-muted-foreground hover:text-primary inline-flex flex-nowrap items-center gap-2 hover:no-underline"
                  >
                    <GitForkIcon className="inline-block size-4" />
                    <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.forkCount)}</span>
                  </Link>
                )}

                <div className="text-muted-foreground whitespace-nowrap">
                  <Suspense fallback={null}>
                    <span>
                      Updated <RelativeTime date={repo!.pushedAt} />
                    </span>
                  </Suspense>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground my-4 text-center">Unable to load repository data at this time.</p>
      )}

      <p className="mt-6 mb-0 text-center text-base font-medium">
        <Button variant="secondary" asChild>
          <Link
            href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories&type=source&sort=stargazers`}
          >
            <GitHubIcon />
            <span className="leading-none">Show All…</span>
          </Link>
        </Button>
      </p>
    </>
  );
};

export default Page;
