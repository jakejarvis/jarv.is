import path from "path";
import { fileURLToPath } from "url";
import del from "del";
import gulp from "gulp";
import { task as execa } from "gulp-execa";
import cache from "gulp-cache";
import htmlmin from "gulp-html-minifier-terser";
import BrowserSync from "browser-sync";

// use up-to-date imagemin plugins instead of those bundled with gulp-imagemin:
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";

// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#what-do-i-use-instead-of-__dirname-and-__filename
const __dirname = path.dirname(fileURLToPath(import.meta.url));

gulp.task("default", gulp.series(
  clean,
  npx("webpack", ["--mode", "production"]),
  npx("hugo"),
  gulp.parallel(
    optimizeHtml,
    optimizeImages,
  ),
));

gulp.task("serve", gulp.series(
  clean,
  gulp.parallel(
    npx("webpack", ["--watch", "--mode", "development"]),
    npx("hugo", ["--watch", "--buildDrafts", "--buildFuture", "--verbose"]),
    startServer,
  ),
));

gulp.task("clean", clean);

function clean() {
  return del([
    "public/",
    "builds/",
    "_vendor/",
    "static/assets/",
  ]);
}

function startServer() {
  const browserSync = BrowserSync.create();
  const publicDir = path.resolve(__dirname, "public");

  browserSync.init({
    server: {
      baseDir: publicDir,
    },
    port: process.env.PORT || 1337,
    reloadDelay: 1000, // delay to prevent double-refresh from hugo & webpack negotiating
    open: false,
    ui: false,
    notify: true,
    localOnly: true,
  });

  return gulp
    .watch("public/**/*")
    .on("change", browserSync.reload);
}

function optimizeHtml() {
  return gulp
    .src("public/**/*.html", { base: "./" })
    .pipe(
      htmlmin({
        html5: true,
        preserveLineBreaks: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: false,
      })
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}

function optimizeImages() {
  return gulp
    .src(["public/**/*.{gif,jpg,jpeg,png,svg}", "!public/assets/emoji/**/*"], { base: "./" })
    .pipe(
      cache(
        imagemin([
          imageminMozjpeg({
            quality: 85,
            progressive: true,
          }),
          imageminPngquant({
            quality: [0.7, 0.9],
            speed: 1,
            strip: true,
          }),
          imageminGifsicle(),
          imageminSvgo(),
        ])
      )
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}

// run a locally installed (i.e. ./node_modules/.bin/foo) binary, similar to a package.json script
function npx(bin, args) {
  // WARNING: MAJOR HACKS AHEAD:
  const cmd = `${bin} ${args ? args.join(" ") : ""}`.trim();
  return execa(cmd, {
    echo: false,
    preferLocal: true,
    shell: true,
    stdio: "inherit",
  });
}
