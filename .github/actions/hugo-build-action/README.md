# GitHub Action for [Hugo](https://github.com/gohugoio/hugo) ✏️ 

**⚠️ Warning:** This branch is specifically for testing the latest `dev` version built from the most recent commits to the [Hugo repository](https://github.com/gohugoio/hugo). For 99.9% of use cases, the stable [`master` branch](https://github.com/jakejarvis/hugo-build-action/tree/master) is more appropriate.


## Usage

### `workflow.yml` Example

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: jakejarvis/hugo-build-action@develop
      with:
        args: --minify --buildDrafts
```


## License

This project is distributed under the [MIT license](LICENSE.md).
