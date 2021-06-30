import gulp from "gulp";
import { task as execa } from "gulp-execa";
import htmlmin from "gulp-html-minifier-terser";
import imagemin from "gulp-imagemin";
import del from "del";

// use up-to-date imagemin plugins instead of those bundled with gulp-imagemin:
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";

gulp.task("default", gulp.series(
  clean,
  npx("webpack", ["--mode", "production", "--profile"]),
  npx("hugo"),
  gulp.parallel(
    optimizeHtml,
    optimizeImages,
  ),
));

gulp.task("serve", gulp.parallel(
  npx("webpack", ["serve", "--progress"]),
  npx("hugo", ["--watch", "--buildDrafts", "--buildFuture", "--verbose"]),
));

gulp.task("clean", clean);

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
    .src(["public/**/*.{gif,jpg,jpeg,png,svg}", "!public/assets/emoji/**/*"], { base: "./" })
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
    "api/**/*.js*",
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
