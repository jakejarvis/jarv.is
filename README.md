# 🏡&nbsp; [jarv.is](https://jarv.is/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7403a53-fd9d-44c0-a708-a84d9fc1454d/deploy-status)](https://app.netlify.com/sites/jakejarvis/deploys)
[![View website](https://img.shields.io/badge/open%20site-jarv.is-green)](https://jarv.is/)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/jakejarvis/jarv.is)
[![Hugo v0.68.3](https://img.shields.io/badge/hugo-v0.68.3-orange)](https://github.com/gohugoio/hugo)
[![License](https://img.shields.io/github/license/jakejarvis/jarv.is?color=red)](LICENSE.md)
[![Twitter Follow](https://img.shields.io/twitter/follow/jakejarvis?label=Follow&style=social)](https://twitter.com/intent/user?screen_name=jakejarvis)

Personal website of [@jakejarvis](https://github.com/jakejarvis), created and deployed using the following:

- [Hugo extended](https://github.com/gohugoio/hugo)
- [Netlify](https://www.netlify.com/)
- [Simple Analytics](https://referral.simpleanalytics.com/jake-jarvis) (referral link)
- [utteranc.es](https://utteranc.es/)
- [Twemoji](https://twemoji.twitter.com/)
- [...and much more.](https://jarv.is/uses/)

I keep an ongoing list of [blog post ideas](https://github.com/jakejarvis/jarv.is/issues/1) and [coding to-dos](https://github.com/jakejarvis/jarv.is/issues/11) as issues in this repo.

## Running a local testing server

#### Using Yarn/NPM:

Run `yarn install` ([Yarn must be installed](https://yarnpkg.com/en/docs/install) first, or use `npm install`) and `yarn start` (or `npm start`), then open [http://localhost:1337/](http://localhost:1337/). Pages will live-refresh when source files are changed.

#### Using Docker:

To ensure consistency and compatibility, the [`Dockerfile`](Dockerfile) in this repository will download the Hugo Extended binary and its dependencies, and start a live testing server.

```bash
docker build -t jarv.is -f Dockerfile .
docker run -v $(pwd):/src -p 1337:1337 jarv.is
```

...then open [http://localhost:1337/](http://localhost:1337/) as above.

## Licenses

![Creative Commons Attribution 4.0 International License](https://raw.githubusercontent.com/creativecommons/cc-cert-core/master/images/cc-by-88x31.png "CC BY")

Site content (everything in [`content/notes`](content/notes/)) is published under the [Creative Commons Attribution 4.0 International License](LICENSE.md) (CC-BY-4.0), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All code in this repository (like my [Hugo theme](layouts/)) is published under the [MIT license](https://opensource.org/licenses/MIT).
