---
title: "I ❤️ GitHub Actions"
date: 2019-10-25 13:58:39-0400
description: "I've found a new hobby of making cool GitHub Actions, the latest tool in the CI world. Here's why."
tags:
  - DevOps
  - GitHub
  - Continuous Integration
  - Docker
  - Open Source
image: "images/actions-flow.png"
draft: false
---

{{< image src="images/actions-flow.png" width="780" alt="Example workflow for a GitHub Action" />}}

Since being accepted into the beta for [GitHub Actions](https://github.com/features/actions) a few months ago, I've found a new side hobby of whipping up new (and ideally creative) actions for anybody to add to their CI pipeline. Actions are modular steps that interact with a GitHub repository and can be coded with [Docker](https://github.com/actions/hello-world-docker-action) or [JavaScript/Node](https://github.com/actions/hello-world-javascript-action) — and either way, they can be as [simple](https://github.com/jakejarvis/wait-action) or as [complex](https://github.com/jakejarvis/lighthouse-action) as you want. But in both cases, they're incredibly fun to make and the results always scratch my itch for instant gratification.

My favorite so far is my [Lighthouse Audit action](https://github.com/jakejarvis/lighthouse-action), which spins up a headless Google Chrome instance in an Ubuntu container and runs [Google's Lighthouse tool](https://developers.google.com/web/tools/lighthouse), which scores webpages on performance, accessibility, SEO, etc. and provides actual suggestions to improve them. It's a perfect example of the power of combining containers with Git workflows.

{{< image src="images/lighthouse-output.png" width="750" >}}The results of a Lighthouse audit on this website, after running tests in a headless Google Chrome.{{< /image >}}

It's also been a fantastic avenue to dip my feet into the collaborative nature of GitHub and the open-source community. I've made some small apps in the past but these are the first projects where I'm regularly receiving new issues to help out with and impressive pull requests to merge. It's a great feeling!

Here are the actions I've made so far, sorted by popularity as of this posting:

- **[💡 🏠 Lighthouse Audit](https://github.com/jakejarvis/lighthouse-action)** — Run a [Google Chrome Lighthouse](https://developers.google.com/web/tools/lighthouse) audit on a webpage.
- **[🔄 🧺 S3 Bucket Sync](https://github.com/jakejarvis/s3-sync-action)** — Sync/upload a directory with a remote AWS S3 bucket.
- **[🗑️ Cloudflare Purge Cache](https://github.com/jakejarvis/cloudflare-purge-action)** — Purge a website's cache via the Cloudflare API.
- **[✏️ Hugo Build](https://github.com/jakejarvis/hugo-build-action)** — The static site generator [Hugo](https://github.com/gohugoio) as an action, with support for legacy versions and extended features.
- **[🔥 Firebase Deploy](https://github.com/jakejarvis/firebase-deploy-action)** — Deploy a static site to [Firebase Hosting](https://firebase.google.com/docs/hosting).
- **[🔄 Backblaze B2 Sync](https://github.com/jakejarvis/backblaze-b2-action)** — Sync a directory with a remote [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html) storage bucket.
- **[💤 Wait](https://github.com/jakejarvis/wait-action)** — A very, very simple action to sleep for a given amount of time (10s, 2m, etc.)

---

As an example of an _extremely_ simple (and almost completely unnecessary) action, the [Wait action](https://github.com/jakejarvis/wait-action) takes one input — a unit of time — and has the pipeline sleep for that amount of time. The [`Dockerfile`](https://github.com/jakejarvis/wait-action/blob/master/Dockerfile) is as simple as this:

{{< gist id="6a0830c7c3e514980b30fdf86b4931c5" file="Dockerfile" >}}

...with a super-short [`entrypoint.sh`](https://github.com/jakejarvis/wait-action/blob/master/entrypoint.sh):

{{< gist id="6a0830c7c3e514980b30fdf86b4931c5" file="entrypoint.sh" >}}

Using an action is also surprisingly simple, and more intuitive than [Travis CI](https://travis-ci.com/) or [CircleCI](https://circleci.com/), in my humble opinion. Pipelines in GitHub Actions are called ["workflows,"](https://help.github.com/en/github/automating-your-workflow-with-github-actions/configuring-a-workflow) and live in a file with [YAML syntax](https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions) in `.github/workflows`. An example of a `workflow.yml` file that uses the above action to wait 10 seconds (on both pushes and pull requests) would look something like:

{{< gist id="6a0830c7c3e514980b30fdf86b4931c5" file="workflow.yml" >}}

---

For a more complex example, when I forked [Hugo](https://github.com/gohugoio/hugo) (the static site generator used to build this website) to make some small personalized changes, I also translated [their `.travis.yml` file](https://github.com/gohugoio/hugo/blob/master/.travis.yml) into a [`workflow.yml` file](https://github.com/jakejarvis/hugo-custom/blob/master/.github/workflows/workflow.yml) for practice, which simultaneously runs comprehensive unit tests on **three operating systems** (Ubuntu 18.04, Windows 10, and macOS 10.14) with the latest two Go versions _each!_ If the tests are all successful, it builds a Docker image and pushes it to both [Docker Hub](https://hub.docker.com/r/jakejarvis/hugo-custom) and the [GitHub Package Registry](https://github.com/jakejarvis/hugo-custom/packages) (also [in beta](https://github.com/features/package-registry)).

{{< image src="images/hugo-logs.png" alt="Build logs for my Hugo fork" />}}

Then another workflow, which [lives in this website's repository](https://github.com/jakejarvis/jarv.is/blob/master/.github/workflows/gh-pages.yml), pulls that Docker image, builds the Hugo site, and pushes it to GitHub Pages. All astoundingly fast. All for free.

---

A plethora of actions is already published on the [GitHub Marketplace](https://github.com/marketplace?type=actions), with dozens more being added every week. If you are not yet in the beta, I urge you to [sign up here](https://github.com/features/actions) and give it a shot. GitHub has been very [receptive to feedback](https://github.community/t5/GitHub-Actions/bd-p/actions) (so far) and I can't wait to see GitHub Actions evolve into an enterprise-grade CI tool at the level of other competitors in this space. ❤️
