# 🏡&nbsp;&nbsp;[jarv.is](https://jarv.is/)

[![Vercel deployment](https://img.shields.io/github/deployments/jakejarvis/jarv.is/production?label=vercel&logo=vercel&logoColor=white)](https://vercel.com/deployments/jarv.is)
[![Next.js version](https://img.shields.io/github/package-json/dependency-version/jakejarvis/jarv.is/next/main?color=ff4088&label=next.js&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Licensed under CC-BY-4.0](https://img.shields.io/badge/license-CC--BY--4.0-fb7828?logo=creative-commons&logoColor=white)](LICENSE)
[![GitHub repo size](https://img.shields.io/github/repo-size/jakejarvis/jarv.is?color=009cdf&label=repo%20size&logo=git&logoColor=white)](https://github.com/jakejarvis/jarv.is)
[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fjarv.is%2Fapi%2Fhits&query=%24.total.hits&logo=googleanalytics&logoColor=white&label=hits&color=salmon&cacheSeconds=1800)](https://jarv.is/api/hits)

My humble abode on the World Wide Web, created and deployed using [Next.js](https://nextjs.org/), [Tailwind CSS](https://github.com/user-attachments/assets/dfe99976-c73d-46f1-8a50-f26338463ad8), [Neon Postgres](https://neon.tech/), [Drizzle](https://orm.drizzle.team/), [Better Auth](https://www.better-auth.com/), [and more](https://jarv.is/humans.txt).

## 🕹️ Getting Started

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/jakejarvis/jarv.is)

I highly recommend spinning up a [Codespace](https://github.com/features/codespaces) with the button above to start inside of a preconfigured and tested environment. But you can also clone this repository locally, run `pnpm install` to pull down the necessary dependencies and `pnpm dev` to start the local server, and then open [localhost:3000](http://localhost:3000/) in a browser. Pages will live-refresh when source files are changed.

**Be sure to populate the required environment variables!** Refer to [`lib/env.ts`](lib/env.ts), which documents (and strictly [type-checks](https://env.t3.gg/docs/introduction)) these variables. The included [`.env.example`](.env.example) file should be copied and used as a template for a new local `.env` file, which the local `next dev` server will then ingest.

> ⚠️ **Currently, there are a few assumptions sprinkled throughout the code that this repo will be deployed to [Vercel](https://nextjs.org/docs/app/building-your-application/deploying#managed-nextjs-with-vercel) and _only_ Vercel.** I'll correct this soon™ now that some escape hatches (namely [OpenNext](https://opennext.js.org/)) actually exist...

## 🌎 Related

- [💻 /uses](https://jarv.is/uses) – Things and stuff I use.
- [🕰️ /previously](https://jarv.is/previously) – An embarrassing trip down this site's memory lane.
  - Visit [/y2k](https://jarv.is/y2k) if you want to experience the _fully_ immersive time machine, but don't say I didn't warn you...
- [🧅 Tor (.onion) mirror](http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion/) – For an excessive level of privacy and security.
- [🧮 jakejarvis/website-stats](https://github.com/jakejarvis/website-stats) – Daily raw snapshots of the [hit counter](app/api/hits/route.ts) database.

## 📜 License

Site content is licensed under the [CC-BY-4.0 license](LICENSE), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All other code in this repository is licensed under the [MIT license](LICENSE-CODE).
