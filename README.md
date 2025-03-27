# 🏡&nbsp;&nbsp;[jarv.is](https://jarv.is/)

[![Vercel deployment](https://img.shields.io/github/deployments/jakejarvis/jarv.is/production?label=vercel&logo=vercel&logoColor=white)](https://vercel.com/deployments/jarv.is)
[![Next.js version](https://img.shields.io/github/package-json/dependency-version/jakejarvis/jarv.is/next/main?color=ff4088&label=next.js&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Licensed under CC-BY-4.0](https://img.shields.io/badge/license-CC--BY--4.0-fb7828?logo=creative-commons&logoColor=white)](LICENSE)
[![GitHub repo size](https://img.shields.io/github/repo-size/jakejarvis/jarv.is?color=009cdf&label=repo%20size&logo=git&logoColor=white)](https://github.com/jakejarvis/jarv.is)

My humble abode on the World Wide Web, created and deployed using [Next.js](https://nextjs.org/), [Vercel](https://vercel.com/), [Upstash Redis](https://upstash.com/), [Giscus](https://giscus.app/), [Umami](https://umami.is/), [and more](https://jarv.is/humans.txt).

I keep an ongoing list of [post ideas](https://github.com/jakejarvis/jarv.is/issues/1) and [coding to-dos](https://github.com/jakejarvis/jarv.is/issues/714) as issues in this repo. Outside contributions, improvements, and/or corrections are welcome too!

## 🕹️ Getting Started

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/jakejarvis/jarv.is)

Run `pnpm install` to install the necessary dependencies and `pnpm dev` to start the local server, and then open [http://localhost:3000/](http://localhost:3000/). Pages will live-refresh when source files are changed.

Most production steps are handled [automatically by Vercel](https://vercel.com/docs/frameworks/nextjs), but running `pnpm build` locally will still generate an unoptimized, less-than-ideal static version which can be served via `pnpm start`.

**☝️ Note:** [pnpm](https://pnpm.io/installation#using-corepack) is highly recommended (for [many reasons!](https://pnpm.io/benchmarks)) but this project should also work just fine with NPM or Yarn.

## 🌎 Related

- [📈 /stats](https://jarv.is/stats) - Public [Umami](https://umami.is/) dashboard.
- [💻 /uses](https://jarv.is/uses) – Things and stuff I use.
- [🕰️ /previously](https://jarv.is/previously) – An embarrassing trip down this site's memory lane.
  - Visit [/y2k](https://jarv.is/y2k) if you want to experience the _fully_ immersive time machine, but don't say I didn't warn you...
- [🧅 Tor (.onion) mirror](http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion/) – For an excessive level of privacy and security.
- [🧮 jakejarvis/website-stats](https://github.com/jakejarvis/website-stats) – Daily raw snapshots of the [hit counter](app/api/hits/route.ts) database.

## 📜 License

Site content is licensed under the [CC-BY-4.0 license](LICENSE), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All other code in this repository is licensed under the [MIT license](LICENSE-CODE).
