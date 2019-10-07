# 🏡&nbsp; [jarv.is](https://jarv.is/)

[![Deploy status](https://github.com/jakejarvis/jarv.is/workflows/GitHub%20Pages/badge.svg)](.github/workflows) [![GitHub repo size](https://img.shields.io/github/repo-size/jakejarvis/jarv.is)](https://github.com/jakejarvis/jarv.is) [![License](https://img.shields.io/github/license/jakejarvis/jarv.is?color=red)](LICENSE.md)

Personal website of [@jakejarvis](https://github.com/jakejarvis), created and deployed using the following:

- [Hugo](https://github.com/gohugoio/hugo)
- [GitHub Actions](.github/workflows)
- [GitHub Pages](https://pages.github.com/)
- [Matomo Analytics](https://matomo.org/)

I keep an ongoing list of [blog post ideas](https://github.com/jakejarvis/jarv.is/issues/1) as an issue in this repo.


## Running a local testing server with Docker

This site runs a [custom version](https://github.com/jakejarvis/hugo) of [Hugo Extended](https://github.com/gohugoio/hugo) with a few (very opinionated) changes. To ensure consistency, the `Dockerfile` in this repository will pull my [pre-built](https://go.jarv.is/30KA6DS) Hugo fork (forked from `v0.53-DEV`, [gohugo/hugo@`a28865c`](https://github.com/gohugoio/hugo/tree/a28865cfc3e296cf0ddd0bd6c1368fcdb2154d0f)) and run a live testing server.

Run these commands on the root of this repository:

```bash
docker build -t jarv.is:develop -f Dockerfile .
docker run -v $(pwd):/src -p 1313:1313 jarv.is:develop
```

...then open [http://localhost:1313/](http://localhost:1313/). Pages will live-refresh when source files are changed.


## Licenses

![Creative Commons Attribution 4.0 International License](https://github.com/creativecommons/cc-cert-core/blob/master/images/cc-by-88x31.png "CC BY")

Site content (everything in [`content/notes`](content/notes/)) is published under the [Creative Commons Attribution 4.0 International License](LICENSE.md) (CC-BY-4.0), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All code in this repository (such as my [Hugo theme](layouts/)) is published under the [MIT license](https://opensource.org/licenses/MIT), except the customized Hugo fork which retains Hugo's [original Apache-2.0 license](https://github.com/gohugoio/hugo/blob/master/LICENSE).

Everything else (such as the press articles and videos in [`misc`](misc/)) belongs to its respective owner(s) under the original license/copyright.
