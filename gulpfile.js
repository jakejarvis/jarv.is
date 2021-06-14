/* eslint-disable prettier/prettier */
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const { spawn } = require("child_process");
const del = require("del");

let hugoOptions = ["--gc", "--cleanDestinationDir", "--verbose"];
let webpackOptions = [];

exports.default = gulp.series(
  clean,
  runWebpack(["--mode", "production", "--profile"]),
  runHugo(),
  gulp.parallel(
    optimizeHtml,
    optimizeImages,
  ),
);

exports.serve = gulp.parallel(
  runWebpack(["serve"]),
  runHugo(["--watch", "--buildDrafts", "--buildFuture"]),
);

exports.clean = gulp.task(clean);

function clean() {
  return del([
    "public/",
    "resources/",
    "builds/",
    "_vendor/",
    "static/assets/",
    "data/manifest.json",
  ]);
}

function runHugo(options) {
  return function() {
    return spawn("./node_modules/.bin/hugo", hugoOptions.concat(options || []), {
      stdio: "inherit",
    });
  }
}

function runWebpack(options) {
  return function() {
    return spawn("./node_modules/.bin/webpack", webpackOptions.concat(options || []), {
      stdio: "inherit",
    });
  }
}

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
          minifyCSS: true,
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
      // TODO: --plugin=mozjpeg --plugin.mozjpeg.progressive --plugin.mozjpeg.quality=85 --plugin=pngquant --plugin.pngquant.quality={0.1,0.3} --plugin.pngquant.speed=1 --plugin.pngquant.strip --plugin=gifsicle --plugin=svgo
      imagemin([
        imagemin.mozjpeg({
          quality: 85,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 2,
        }),
        imagemin.gifsicle(),
        imagemin.svgo(),
      ],
      {
        verbose: true,
      })
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}
