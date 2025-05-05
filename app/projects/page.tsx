import { env } from "@/lib/env";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GitForkIcon, StarIcon } from "lucide-react";
import PageTitle from "@/components/page-title";
import Link from "@/components/link";
import RelativeTime from "@/components/relative-time";
import ActivityCalendar from "./activity-calendar";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";
import { getContributions, getRepos } from "./github";

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

      <Suspense fallback={<p>Failed to generate activity calendar.</p>}>
        <div
          className={cn(
            "mx-auto mt-4 mb-8",
            String.raw`[&_:where(.react-activity-calendar\_\_count,.react-activity-calendar\_\_legend-month,.react-activity-calendar\_\_legend-colors)]:text-muted-foreground`,
            "[--activity-0:#ebedf0] [--activity-1:#9be9a8] [--activity-2:#40c463] [--activity-3:#30a14e] [--activity-4:#216e39]",
            "dark:[--activity-0:#252525] dark:[--activity-1:#033a16] dark:[--activity-2:#196c2e] dark:[--activity-3:#2ea043] dark:[--activity-4:#56d364]"
          )}
        >
          <ActivityCalendar data={contributions} />
        </div>
      </Suspense>

      <h2 className="my-3.5 text-xl font-medium">
        <Link
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}?tab=repositories&sort=stargazers`}
          className="text-secondary-foreground hover:no-underline"
        >
          Popular repositories
        </Link>
      </h2>

      <div className="row-auto grid w-full grid-cols-none gap-4 md:grid-cols-2">
        {repos?.map((repo) => (
          <div key={repo!.name} className="border-ring/65 h-fit rounded-2xl border-1 p-4">
            <Link href={repo!.url} className="mb-2 inline-block text-base font-semibold">
              {repo!.name}
            </Link>

            {repo!.description && <p className="text-foreground/85 m-0 text-sm leading-relaxed">{repo!.description}</p>}

            <div className="text-muted-foreground mt-2 flex flex-wrap space-x-4 text-[0.825rem]">
              {repo!.primaryLanguage && (
                <div className="mt-1 whitespace-nowrap">
                  {repo!.primaryLanguage.color && (
                    <span
                      className="mr-2 inline-block size-[16px] align-text-top"
                      style={{ backgroundColor: repo!.primaryLanguage.color, borderRadius: "50%" }}
                    />
                  )}
                  <span>{repo!.primaryLanguage.name}</span>
                </div>
              )}

              {repo!.stargazerCount > 0 && (
                <div className="mt-1 whitespace-nowrap">
                  <Link
                    href={`${repo!.url}/stargazers`}
                    title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.stargazerCount)} ${repo!.stargazerCount === 1 ? "star" : "stars"}`}
                    className="hover:text-primary text-muted-foreground hover:no-underline"
                  >
                    <StarIcon className="mr-2 inline-block size-[16px] align-text-top" />
                    <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.stargazerCount)}</span>
                  </Link>
                </div>
              )}

              {repo!.forkCount > 0 && (
                <div className="mt-1 whitespace-nowrap">
                  <Link
                    href={`${repo!.url}/network/members`}
                    title={`${Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.forkCount)} ${repo!.forkCount === 1 ? "fork" : "forks"}`}
                    className="hover:text-primary text-muted-foreground hover:no-underline"
                  >
                    <GitForkIcon className="mr-2 inline-block size-[16px] align-text-top" />
                    <span>{Intl.NumberFormat(env.NEXT_PUBLIC_SITE_LOCALE).format(repo!.forkCount)}</span>
                  </Link>
                </div>
              )}

              <div className="mt-1 whitespace-nowrap">
                <span
                  // invisible icon hack to fix line height
                  className="mr-0 inline-block h-[16px] w-0 align-text-top"
                />
                <span>
                  Updated <RelativeTime date={repo!.pushedAt} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 mb-0 text-center text-base font-medium">
        <Link href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`} className="hover:no-underline">
          View more on{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-foreground/80 mx-0.5 inline size-[20px] align-text-top"
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
