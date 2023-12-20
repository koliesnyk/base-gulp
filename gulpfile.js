var gulp         = require("gulp"),
		sass         = require("gulp-sass")(require("sass")),
		browserSync  = require("browser-sync"),
		cleancss     = require("gulp-clean-css"),
		autoprefixer = require("gulp-autoprefixer"),
		gutil        = require("gulp-util"),
		ftp          = require("vinyl-ftp");

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
});

const ftpConfig = {
  host: "",
  port: 21,
  user: "",
  password: "",
  parallel: 10,
  log: gutil.log,
};

gulp.task("deploy", function () {
  const conn = ftp.create(ftpConfig);

  return gulp
    .src(["app/**/*"], { base: "app/", buffer: false })
    .pipe(conn.newer("/")) // Upload only newer files
    .pipe(conn.dest("/"));
});

gulp.task("styles", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 10 versions"],
      })
    )
    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
  return gulp.src("app/js/**/*.js").pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("styles"));
  gulp.watch("app/js/**/*.js", gulp.parallel("scripts"));
  // gulp.watch("app/**/*", gulp.series("deploy"));
});

gulp.task("default", gulp.parallel("styles", "browser-sync", "watch"));
