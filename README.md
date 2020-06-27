# 🏡&nbsp; [jarv.is](https://jarv.is/)&nbsp; [![Netlify](https://img.shields.io/netlify/a7403a53-fd9d-44c0-a708-a84d9fc1454d?logo=netlify&logoColor=white)](https://app.netlify.com/sites/jakejarvis/deploys) [![Hugo v0.68.3](https://img.shields.io/badge/hugo-v0.68.3-ff4088?logo=hugo&logoColor=white)](https://github.com/gohugoio/hugo) [![Licensed under CC-BY-4.0](https://img.shields.io/github/license/jakejarvis/jarv.is?color=fb7828&logo=creative-commons&logoColor=white)](LICENSE.md) [![Twitter Follow](https://img.shields.io/twitter/follow/jakejarvis?label=Follow&style=social)](https://twitter.com/intent/user?screen_name=jakejarvis)

Personal website of [@jakejarvis](https://github.com/jakejarvis), created and deployed using the following:

- [Hugo Extended](https://github.com/gohugoio/hugo)
- [Netlify](https://www.netlify.com/)
- [Simple Analytics](https://referral.simpleanalytics.com/jake-jarvis) (referral link)
  - 📈 My [stats are public](https://jarv.is/stats/), by the way!
- [...and more.](https://jarv.is/uses/)

I keep an ongoing list of [blog post ideas](https://github.com/jakejarvis/jarv.is/issues/1) and [coding to-dos](https://github.com/jakejarvis/jarv.is/issues/11) as issues in this repo.

## 💾 Running a local testing server

### 🧶 Using Yarn/NPM:

Run `yarn install` ([Yarn must be installed](https://yarnpkg.com/en/docs/install) first, or use `npm install` if you insist) and `yarn start` (or `npm start`), then open [http://localhost:1337/](http://localhost:1337/). Pages will live-refresh when source files are changed.

### 🐳 Using Docker:

To ensure consistency and compatibility, the [`Dockerfile`](Dockerfile) in this repository will download the correct version of the Hugo Extended binary and its dependencies, and start a live testing server in a temporary container.

Using Docker doesn't require Node or Yarn, but you can also use `yarn start:docker` (or `npm run start:docker`) which is simply an alias for:

```bash
docker run --rm -v $(pwd):/src -p 1337:1337 $(docker build --no-cache -q .)
```

Once built, these two methods act identically — simply open [http://localhost:1337/](http://localhost:1337/) as above.

### 🤯 Why does this sound _way_ more complex than it needs to be?!

[Because it is.](https://www.jvt.me/talks/overengineering-your-personal-website/)

## 📜 Licenses

![Creative Commons Attribution 4.0 International License](https://raw.githubusercontent.com/creativecommons/cc-cert-core/master/images/cc-by-88x31.png "CC BY")

Site content (everything in [`content/notes`](content/notes/)) is published under the [**Creative Commons Attribution 4.0 International License**](LICENSE.md) (CC-BY-4.0), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All original code in this repository (like my [Hugo theme](layouts/)) is published under the [**MIT License**](https://opensource.org/licenses/MIT).

External assets include:

- [**Twemoji**](https://twemoji.twitter.com/): Copyright (c) 2018 Twitter, Inc. and other contributors. [Licensed under CC-BY-4.0.](https://github.com/twitter/twemoji/blob/v12.1.5/LICENSE-GRAPHICS)
- [**Inter**](https://rsms.me/inter/): Copyright (c) 2016-2020 The Inter Project Authors. [Licensed under the SIL Open Font License, Version 1.1.](https://github.com/rsms/inter/blob/v3.13/LICENSE.txt)
- [**Hack**](https://sourcefoundry.org/hack/): Copyright (c) 2018 Source Foundry Authors. [Licensed under the MIT License.](https://github.com/source-foundry/Hack/blob/v3.003/LICENSE.md)
- [**Comic Neue**](http://comicneue.com/): Copyright (c) 2014 The Comic Neue Project Authors. [Licensed under the SIL Open Font License, Version 1.1.](https://github.com/crozynski/comicneue/blob/v2.5/OFL.txt)
