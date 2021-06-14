/* eslint-disable prettier/prettier */
const { spawn } = require("child_process");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');

const webpackOptions = [];
const hugoOptions = ["--gc", "--cleanDestinationDir", "--verbose"];

gulp.task(
  "webpack",
  function () {
    return gulp
      .src("assets/js/index.js")
      .pipe(gulpWebpack({config: require("./webpack.config.js")}, webpack))
      .pipe(gulp.dest("dist/"));
  }
);

gulp.task(
  "build",
  gulp.series("webpack")
);

gulp.task(
  "watch",
  gulp.parallel(
    () => runWebpack(["serve"]),
    () => runHugo(["--buildFuture", "--watch", "--baseURL", "/"])
  )
);

/*
browserSync.init({
  server: {
    baseDir: "./public",
  },
});*/
//  gulp.watch("./public/**/*").on("change", browserSync.reload);

// helper functions
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
