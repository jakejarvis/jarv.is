const gulp = require("gulp");
const htmlmin = require("gulp-html-minifier-terser");
const imagemin = require("gulp-imagemin");
const { spawn } = require("child_process");
const del = require("del");
const hugoBin = require("hugo-extended");

// use up-to-date imagemin plugins instead of those bundled with gulp-imagemin:
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

let hugoDefaults = ["--gc", "--cleanDestinationDir", "--verbose"];
let webpackDefaults = [];

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

function runHugo(options) {
  return hugo = () => {
    // WARNING: MAJOR HACK AHEAD
    return spawn(hugoBin, hugoDefaults.concat(options || []), {
      stdio: "inherit",
    });
  }
}

function runWebpack(options) {
  return webpack = () => {
    // WARNING: MAJOR HACK AHEAD
    return spawn("./node_modules/.bin/webpack", webpackDefaults.concat(options || []), {
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
      imagemin([
        imageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
        imageminPngquant({
          quality: [0.1, 0.3],
          speed: 1,
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
