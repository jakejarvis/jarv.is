const gulp = require("gulp");
const execa = require("gulp-execa").task;
const htmlmin = require("gulp-html-minifier-terser");
const imagemin = require("gulp-imagemin");
const del = require("del");

// use up-to-date imagemin plugins instead of those bundled with gulp-imagemin:
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminSvgo = require("imagemin-svgo");

exports.default = gulp.series(
  clean,
  npx("webpack", ["--mode", "production", "--profile"]),
  npx("hugo"),
  gulp.parallel(
    optimizeHtml,
    optimizeImages,
  ),
);

exports.serve = gulp.parallel(
  npx("webpack", ["serve"]),
  npx("hugo", ["--watch", "--buildDrafts", "--buildFuture", "--verbose"]),
);

exports.clean = gulp.task(clean);

function optimizeHtml() {
  return gulp
    .src("public/**/*.html", { base: "./" })
    .pipe(
      htmlmin(
        {
          html5: true,
          preserveLineBreaks: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true,
          minifyCSS: false,
          minifyJS: false,
        }
      )
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}

function optimizeImages() {
  return gulp
    .src(["public/**/*.{gif,jpg,png,svg}", "!public/assets/emoji/*"], { base: "./" })
    .pipe(
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
      ],
      {
        verbose: true,
      })
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}

function clean() {
  return del([
    "public/",
    "builds/",
    "_vendor/",
    "static/assets/",
    "data/manifest.json",
  ]);
}

// run a locally installed (i.e. ./node_modules/.bin/foo) binary, similar to a package.json script
function npx(bin, options) {
  // WARNING: MAJOR HACKS AHEAD:
  const cmd = `${bin} ${options ? options.join(" ") : ""}`.trim();
  return execa(cmd, {
    preferLocal: true,
    shell: true,
    stdio: "inherit",
  });
}
