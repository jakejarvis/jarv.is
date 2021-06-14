/* eslint-disable prettier/prettier */
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const webpack = require('webpack'); // we're using a newer version of webpack than webpack-stream does
const webpackStream = require('webpack-stream');
const webpackConfig = require("./webpack.config.js");
const imagemin = require("gulp-imagemin");
const { spawn } = require("child_process");
const del = require("del");

const hugoOptions = ["--gc", "--cleanDestinationDir", "--verbose"];
const webpackOptions = ["--profile"];

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
  "watchHugo",
  function () {
    return spawn("yarn", ["hugo"].concat(hugoOptions, ["--watch", "--buildDrafts", "--buildFuture", "--baseURL", "/"]), {
      stdio: "inherit",
    });
  }
);

gulp.task(
  "webpack",
  function () {
    return spawn("yarn", ["webpack"].concat(["--mode", "production"], webpackOptions), {
      stdio: "inherit",
    });
  }
);

gulp.task(
  "watchWebpack",
  function () {
    return spawn("yarn", ["webpack"].concat(["serve"], webpackOptions), {
      stdio: "inherit",
    });
  }
);

gulp.task(
  "optimizeHtml",
  function () {
    return gulp.src("public/**/*.html", { base: "./" })
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
);

gulp.task(
  "optimizeImages",
  function () {
    return gulp.src(["public/**/*.{gif,jpg,png,svg}", "!public/assets/emoji/*"], { base: "./" })
      .pipe(
        // TODO: --plugin=mozjpeg --plugin.mozjpeg.progressive --plugin.mozjpeg.quality=85 --plugin=pngquant --plugin.pngquant.quality={0.1,0.3} --plugin.pngquant.speed=1 --plugin.pngquant.strip --plugin=gifsicle --plugin=svgo
        imagemin([
          imagemin.mozjpeg(),
          imagemin.optipng(),
          imagemin.gifsicle(),
          imagemin.svgo(),
        ],
        {
          verbose: true,
        })
      )
      .pipe(gulp.dest(".", { overwrite: true }));
  }
);

gulp.task(
  "optimize",
  gulp.parallel(
    "optimizeHtml",
    "optimizeImages",
  )
)

gulp.task(
  "build",
  gulp.series(
    "webpack",
    "hugo",
    "optimize",
  )
);

gulp.task(
  "serve",
  gulp.parallel(
    "watchHugo",
    "watchWebpack",
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
