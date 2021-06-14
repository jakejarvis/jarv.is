/* eslint-disable prettier/prettier */
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const webpack = require('webpack'); // we're using a newer version of webpack than webpack-stream does
const webpackStream = require('webpack-stream');
const { spawn } = require("child_process");
const del = require("del");

//const webpackOptions = [];
const hugoOptions = ["--gc", "--cleanDestinationDir", "--verbose"];

gulp.task(
  "clean",
  function () {
    return del([
      "public/",
      "resources/",
      "builds/",
      "_vendor/",
      "static/assets/",
      "data/manifest.json",
    ]);
  }
);

gulp.task(
  "hugo",
  function () {
    return spawn("yarn", ["hugo"].concat(hugoOptions), {
      stdio: "inherit",
    });
  }
);

gulp.task(
  "webpack",
  function () {
    return gulp
      .src("assets/js/index.js")
      .pipe(
        webpackStream(
          { config: require("./webpack.config.js") },
          webpack
        )
      )
      .pipe(gulp.dest("static/assets"));
  }
);

gulp.task(
  "html",
  function () {
    return gulp.src("public/**/*.html")
      .pipe(
        htmlmin(
          {
            // TODO: html-minifier --html5 --collapse-whitespace --collapse-boolean-attributes --preserve-line-breaks --minify-css --remove-comments
            collapseWhitespace: true
          }
        )
      )
      .pipe(gulp.dest("public"));
  }
);

gulp.task(
  "build",
  gulp.series(
    "clean",
    "webpack",
    "hugo",
    gulp.parallel(
      "html"
    )
  )
);

/*
gulp.task(
  "watch",
  gulp.parallel(
    () => runWebpack(["serve"]),
    () => runHugo(["--buildFuture", "--watch", "--baseURL", "/"])
  )
);
*/
/*
browserSync.init({
  server: {
    baseDir: "./public",
  },
});*/
//  gulp.watch("./public/**/*").on("change", browserSync.reload);

// helper functions
/*
function runHugo(options) {
  return spawn("yarn", ["hugo"].concat(hugoOptions, options || []), {
    stdio: "inherit",
  });
}

function runWebpack(options) {
  return spawn("yarn", ["webpack"].concat(webpackOptions, options || []), {
    stdio: "inherit",
  });
}
*/
