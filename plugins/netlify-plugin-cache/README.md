# ⚡ Netlify Plugin: Custom Cache [![npm](https://img.shields.io/npm/v/netlify-plugin-cache?logo=npm&color=red)](https://www.npmjs.com/package/netlify-plugin-cache) ![CI](https://github.com/jakejarvis/netlify-plugin-cache/workflows/CI/badge.svg)

A generic cache plugin for saving and restoring files and/or folders between Netlify builds for impressive speed improvements. Worry less about running out of build minutes! ⏰

Essentially, this plugin is a pretty wrapper around [Netlify's native cache utility](https://github.com/netlify/build/blob/master/packages/cache-utils/README.md) — it isn't tied to any specific static site generator (on purpose).

## 💿 Install

Add the following lines to your `netlify.toml`:

```toml
[[plugins]]
package = "netlify-plugin-cache"
  [plugins.inputs]
  # Optional (but highly recommended). Defaults to [".cache"].
  paths = ["resources", "_vendor", "folder/file.md"]
```

This plugin only takes one input named `paths`: an array of files and/or directories relative to your project's root. These files/directories are restored before a build and saved in cache after a build **if it is successful**.

**🚨 Important:** `paths` defaults to `[".cache"]`, but it's **highly recommended** you set this yourself based on the tool(s) you're using to generate your site. See examples below.

Read more about plugin configuration at [the official Netlify Plugin docs](https://docs.netlify.com/configure-builds/build-plugins/#install-a-plugin).

## 👩‍💻 Usage

- **Hugo:** Caching the `resources` directory can speed up your build greatly if you [process](https://gohugo.io/content-management/image-processing/) a lot of images, or compile SASS/SCSS via Hugo pipes. You can also cache the `public` directory to avoid completely rebuilding the entire site on each deploy. [More info here.](https://gohugo.io/getting-started/directory-structure/#directory-structure-explained)
- **Gatsby:** By default, the `.cache` directory holds persistent data between builds. You can also cache the `dist` directory to avoid completely rebuilding the entire site on each deploy. [More info here.](https://www.gatsbyjs.org/docs/build-caching/)
- **Jekyll:** A caching API was added as of v4. The notoriously slow SSG can become (relatively) faster by caching the `.jekyll-cache` directory. [More info here.](https://jekyllrb.com/tutorials/cache-api/)
- **Next.js:** The `.next` directory holds the build output. [More info here.](https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory)
- **Anything else:** This is the reason I kept this plugin as generic as possible! Research the caching behavior of your static site generator (and how to customize it if necessary). Feel free to open a PR and list it here as well!

## 🐛 Debugging

This plugin doesn't provide a way to output a list of files that were cached or restored, because Netlify already provides an official plugin named [`netlify-plugin-debug-cache`](https://github.com/netlify-labs/netlify-plugin-debug-cache) to do exactly that. No need to re-invent the wheel!

You can add the debug plugin **after** this plugin in your `netlify.toml`. (And yes, you need a `[[plugins]]` line for _each_ plugin you add.)

```toml
[[plugins]]
package = "netlify-plugin-debug-cache"
```

The debug plugin will generate a file named `cache-output.json` at the root of your project's publish directory. [See an example file](https://infallible-wing-581e78.netlify.app/cache-output.json) or [learn more about this plugin](https://github.com/netlify-labs/netlify-plugin-debug-cache).

## 📜 License

This project is distributed under the [MIT license](LICENSE).
